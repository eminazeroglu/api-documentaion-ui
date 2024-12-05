import { dom } from "../../utils/dom.js";

export function createRequestBody({ body }) {
    if (!body) return document.createDocumentFragment();

    return dom.createElement(`
        <div class="request-body bg-white dark:bg-dark-800 rounded-lg p-6 shadow-sm">
            <h2 class="section-title text-lg font-semibold mb-4 text-slate-900 dark:text-dark-50">Request Body</h2>
            <div class="body-fields space-y-4">
                ${Object.entries(body).map(([name, prop]) => `
                    <div class="field-item border-b last:border-0 pb-4">
                        <div class="field-header flex items-center justify-between">
                            <div class="field-info flex items-center space-x-2">
                                <span class="field-name font-mono text-sm text-slate-700 dark:text-dark-300">${name}</span>
                                ${prop.required ? `
                                    <span class="required-badge text-red-500 text-xs">Required</span>
                                ` : ''}
                            </div>
                            <span class="field-type text-xs px-2 py-1 bg-slate-100 dark:bg-dark-700 rounded">
                                ${prop.type}
                            </span>
                        </div>

                        ${prop.description ? `
                            <p class="field-description text-sm text-slate-600 dark:text-dark-400 mt-1">
                                Description: ${prop.description}
                            </p>
                        ` : ''}

                        ${prop.default !== undefined ? `
                            <p class="field-default text-xs text-slate-500 dark:text-dark-500 mt-1">
                                Default: ${JSON.stringify(prop.default)}
                            </p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `);
}