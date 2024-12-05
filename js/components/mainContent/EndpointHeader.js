import { getMethodColorClass } from '../../utils/colors.js';
import { dom } from '../../utils/dom.js';

export function createEndpointHeader({ path, method, details }) {
    return dom.createElement(`
        <div class="endpoint-header bg-white dark:bg-dark-800 rounded-lg p-6 shadow-sm">
            <div class="header-main flex items-center space-x-2">
                <span class="method-badge ${getMethodColorClass(method)} px-2 py-1 rounded text-sm font-bold uppercase">
                    ${method}
                </span>
                <span class="endpoint-path font-mono text-slate-700 dark:text-dark-300">${path}</span>
                ${details.authorization ? `
                    <span class="auth-badge px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded text-xs font-medium">
                        Requires Authentication
                    </span>
                ` : ''}
            </div>

            ${details.summary ? `
                <h1 class="endpoint-title text-xl font-bold mt-4 mb-2 text-slate-900 dark:text-dark-50">
                    ${details.summary}
                </h1>
            ` : ''}

            ${details.description ? `
                <p class="endpoint-description text-slate-600 dark:text-dark-400">
                    ${details.description}
                </p>
            ` : ''}
        </div>
    `);
}