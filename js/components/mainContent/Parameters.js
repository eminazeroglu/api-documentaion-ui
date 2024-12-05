import { dom } from "../../utils/dom.js";

export function createParameters({ parameters }) {
    if (!parameters?.length) return document.createDocumentFragment();

    return dom.createElement(`
        <div class="parameters-section bg-white dark:bg-dark-800 rounded-lg p-6 shadow-sm">
            <h2 class="section-title text-lg font-semibold mb-4 text-slate-900 dark:text-dark-50">Parameters</h2>
            <div class="parameters-list space-y-4">
                ${parameters.map(param => `
                    <div class="parameter-item border-b last:border-0 pb-4">
                        <div class="param-header flex items-center justify-between">
                            <div class="param-info flex items-center space-x-2">
                                <span class="param-name font-mono text-sm text-slate-700 dark:text-dark-300">${param.name}</span>
                                ${param.required ? `
                                    <span class="required-badge text-red-500 text-xs">Required</span>
                                ` : ''}
                            </div>
                            <span class="param-type text-xs px-2 py-1 bg-slate-100 dark:bg-dark-700 rounded">
                                ${param.in} - ${param.type || param.schema?.type}
                            </span>
                        </div>
                        ${param.description ? `
                            <p class="param-description text-sm text-slate-600 dark:text-dark-400 mt-1">
                                ${param.description}
                            </p>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `);
}