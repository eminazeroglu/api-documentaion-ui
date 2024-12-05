import { dom } from "../../utils/dom.js";
import { getStatusColorClass } from "../../utils/colors.js";

export function createResponses({ responses = {} }) {
    return dom.createElement(`
        <div class="responses-section bg-white dark:bg-dark-800 rounded-lg p-6 shadow-sm">
            <h2 class="section-title text-lg font-semibold mb-4 text-slate-900 dark:text-dark-50">Responses</h2>
            <div class="responses-list space-y-4">
                ${Object.entries(responses).map(([code, response]) => `
                    <div class="response-item border-b last:border-0 pb-4">
                        <div class="response-header flex items-center space-x-2 mb-2">
                            <span class="status-code ${getStatusColorClass(code)} px-2 py-1 rounded text-sm font-bold">
                                ${code}
                            </span>
                            <span class="response-description text-slate-600 dark:text-dark-400">
                                ${response.description || ''}
                            </span>
                        </div>

                        ${response ? `
                            <pre class="response-example bg-slate-50 dark:bg-dark-700 p-4 rounded-lg text-sm overflow-x-auto">
                                ${JSON.stringify(response, null, 2)}
                            </pre>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `);
}
