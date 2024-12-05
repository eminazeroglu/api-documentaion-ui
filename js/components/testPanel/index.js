import { store, actions } from '../../state.js';
import { eventBus, EVENT_TYPES } from '../../events.js';
import { api } from '../../utils/api.js';
import { tokenUtils } from '../../utils/token.js';
import { dom } from '../../utils/dom.js';
import { createHeaderFields } from './HeaderFields.js';
import { createQueryParameters } from './QueryParameters.js';
import { createRequestBodyField } from './RequestBodyField.js';
import { createResponsePanel } from './ResponsePanel.js';

export class TestPanel {
    constructor() {
        this.panelContainer = document.querySelector('.test-panel');
        this.endpoint = null;
        this.headers = [{ key: '', value: '' }];
        this.queryParams = {};
        this.requestBody = {};
        this.response = null;
        
        this.init();
    }

    init() {
        eventBus.on(EVENT_TYPES.ENDPOINT_SELECTED, (endpoint) => {
            this.endpoint = endpoint;
            this.response = null;
            this.resetForm();
            this.render();
        });

        window.addEventListener('storage', () => {
            if (this.endpoint?.details?.authorization) {
                this.render();
            }
        });
    }

    resetForm() {
        this.headers = [{ key: '', value: '' }];
        this.queryParams = {};
        
        if (this.endpoint?.details?.formBody) {
            const values = this.endpoint.details.formBody;
            this.requestBody = Object.keys(values).reduce((acc, key) => {
                acc[key] = values[key].default || '';
                return acc;
            }, {});
        } else {
            this.requestBody = {};
        }
    }

    render() {
        if (!this.endpoint) {
            this.panelContainer.innerHTML = '';
            return;
        }

        const hasToken = tokenUtils.hasToken();
        const method = this.endpoint.method.toUpperCase();

        this.panelContainer.innerHTML = `
            ${this.endpoint.details.authorization ? `
                <div class="auth-status p-4 border-b border-slate-200 dark:border-dark-700">
                    <div class="status-wrapper flex items-center justify-between">
                        <span class="auth-text text-sm font-medium text-slate-700 dark:text-dark-300">
                            Authentication Required
                        </span>
                        ${hasToken ? `
                            <span class="token-status bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-1 rounded">
                                Token Available
                            </span>
                        ` : `
                            <span class="token-status bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 text-xs px-2 py-1 rounded">
                                Token Required
                            </span>
                        `}
                    </div>
                </div>
            ` : ''}
            <div class="request-form-wrapper border-b border-slate-200 dark:border-dark-700">
                <form class="request-form p-4 space-y-4">
                    <div class="headers-section"></div>
                    <div class="query-params-section"></div>
                    <div class="request-body-section"></div>
                    <button type="submit" 
                        class="submit-request w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
                        Send Request
                    </button>
                </form>
            </div>
            <div class="response-section"></div>
        `;

        // Get form sections
        const form = this.panelContainer.querySelector('.request-form');
        const headersSection = this.panelContainer.querySelector('.headers-section');
        const queryParamsSection = this.panelContainer.querySelector('.query-params-section');
        const requestBodySection = this.panelContainer.querySelector('.request-body-section');
        const responseSection = this.panelContainer.querySelector('.response-section');

        // Create and append header fields
        const headerFields = createHeaderFields({
            headers: this.headers,
            onChange: (headers) => {
                this.headers = headers;
                actions.setHeaders(headers);
            }
        });
        headersSection.appendChild(headerFields);

        // Create and append query parameters if they exist
        if (this.endpoint.details.query) {
            const queryParameters = createQueryParameters({
                query: this.endpoint.details.query,
                onChange: (key, value) => {
                    this.queryParams[key] = value;
                }
            });
            if (queryParameters) {
                queryParamsSection.appendChild(queryParameters);
            }
        }

        // Create and append request body field if needed
        if (Object.keys(this.requestBody).length > 0 && !['GET', 'HEAD'].includes(method)) {
            const requestBodyField = createRequestBodyField({
                value: JSON.stringify(this.requestBody, null, 2),
                onChange: (value) => {
                    try {
                        this.requestBody = JSON.parse(value);
                        actions.setRequestBody(this.requestBody);
                    } catch (error) {
                        console.error('Invalid JSON:', error);
                    }
                }
            });
            requestBodySection.appendChild(requestBodyField);
        }

        // Create and append response panel
        const responsePanel = createResponsePanel({
            response: this.response
        });
        responseSection.appendChild(responsePanel);

        // Add form submit handler
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        try {
            let url = this.endpoint.path;
            if (Object.keys(this.queryParams).length > 0) {
                const queryString = Object.entries(this.queryParams)
                    .filter(([_, value]) => value !== '')
                    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                    .join('&');
                if (queryString) {
                    url += `?${queryString}`;
                }
            }

            const headersObj = this.headers.reduce((acc, h) => {
                if (h.key && h.value) acc[h.key] = h.value;
                return acc;
            }, {});

            const method = this.endpoint.method.toUpperCase();
            const requestBody = ['GET', 'HEAD'].includes(method) ? undefined : this.requestBody;

            const response = await api.sendRequest({
                endpoint: { ...this.endpoint, path: url },
                headers: headersObj,
                body: requestBody
            });

            this.response = response;
            this.render();
            eventBus.emit(EVENT_TYPES.RESPONSE_RECEIVED, response);
        } catch (error) {
            this.response = { error: error.message };
            this.render();
            eventBus.emit(EVENT_TYPES.ERROR_OCCURRED, error);
        }
    }
}