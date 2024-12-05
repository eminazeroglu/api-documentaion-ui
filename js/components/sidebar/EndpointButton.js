import { getMethodColorClass } from '../../utils/colors.js';
import { dom } from '../../utils/dom.js';

export function createEndpointButton({ path, method, details, onClick }) {
    const button = dom.createElement(`
        <button class="endpoint-button w-full p-3 text-sm text-left hover:bg-slate-50 dark:hover:bg-dark-700 border-b border-slate-100 dark:border-dark-700 flex items-center group">
            <span class="method-badge ${getMethodColorClass(method)} px-2 py-1 rounded text-xs font-bold uppercase mr-2">
                ${method}
            </span>
            <div class="endpoint-info flex flex-col flex-1 min-w-0">
                <span class="endpoint-path font-mono text-sm truncate">${path}</span>
                ${details.summary ? `
                    <span class="endpoint-summary text-xs text-slate-500 dark:text-dark-400 truncate mt-0.5">
                        ${details.summary}
                    </span>
                ` : ''}
            </div>
        </button>
    `);

    button.addEventListener('click', onClick);

    return button;
}