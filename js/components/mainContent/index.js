import { eventBus, EVENT_TYPES } from '../../events.js';
import { createEndpointHeader } from './EndpointHeader.js';
import { createParameters } from './Parameters.js';
import { createRequestBody } from './RequestBody.js';
import { createResponses } from './Responses.js';

export class MainContent {
    constructor() {
        this.contentWrapper = document.querySelector('.content-wrapper');
        this.init();
    }

    init() {
        this.renderEmptyState();

        eventBus.on(EVENT_TYPES.ENDPOINT_SELECTED, (endpoint) => {
            this.renderEndpoint(endpoint);
        });
    }

    renderEmptyState() {
        this.contentWrapper.innerHTML = `
            <div class="empty-state flex items-center justify-center text-slate-500 dark:text-dark-400">
                Select an API endpoint from the sidebar
            </div>
        `;
    }

    renderEndpoint(endpoint) {
        if (!endpoint) {
            this.renderEmptyState();
            return;
        }

        const { path, method, details } = endpoint;
        this.contentWrapper.innerHTML = '';

        // Create and append components
        const header = createEndpointHeader({ path, method, details });
        const parameters = createParameters({ parameters: details.query });
        const requestBody = createRequestBody({ body: details.formBody });
        const responses = createResponses({ responses: details.responses });

        this.contentWrapper.append(
            header,
            parameters,
            requestBody,
            responses
        );
    }
}