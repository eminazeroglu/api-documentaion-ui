import { dom } from "../../utils/dom.js";

export function createResponsePanel({ response }) {
    if (!response) {
        return dom.createElement(`
            <div class="empty-response h-2/3 flex items-center justify-center text-slate-500 dark:text-dark-400">
                Response will appear here
            </div>
        `);
    }

    const statusColor = response.status >= 200 && response.status < 300
        ? 'text-green-600 dark:text-green-400'
        : 'text-red-600 dark:text-red-400';

    return dom.createElement(`
        <div class="response-container overflow-y-auto">
            <div class="response-header p-4 border-b border-slate-200 dark:border-dark-700 sticky top-0 bg-white dark:bg-dark-800">
                <div class="header-content flex items-center gap-2">
                    <span class="status-code font-medium ${statusColor}">
                        Status: ${response.status}
                    </span>
                    ${response.error ? `
                        <span class="error-message text-red-600 dark:text-red-400 text-sm">
                            ${response.error}
                        </span>
                    ` : ''}
                </div>
            </div>
            <div class="response-body p-4">
                <pre class="response-data whitespace-pre-wrap font-mono text-sm text-slate-800 dark:text-dark-200">${JSON.stringify(response.data, null, 2)}</pre>
            </div>
        </div>
    `);
}