import { dom } from '../../utils/dom.js';

export function createQueryParameters({ query, onChange }) {
    if (!query || Object.keys(query).length === 0) return null;

    const container = dom.createElement(`
        <div class="query-params-container space-y-3">
            <div class="params-title flex justify-between items-center">
                <label class="text-sm font-medium text-slate-700 dark:text-dark-300">Query Parameters</label>
            </div>
            <div class="params-list space-y-2"></div>
        </div>
    `);

    const paramsList = container.querySelector('.params-list');

    Object.entries(query).forEach(([key, param]) => {
        const field = dom.createElement(`
            <div class="param-item flex gap-2 items-start">
                <div class="flex-1">
                    <div class="param-header flex items-center justify-between mb-1">
                        <label class="param-name text-xs text-slate-600 dark:text-dark-400">${key}</label>
                        ${param.required ? `
                            <span class="required-badge text-xs text-red-500">Required</span>
                        ` : ''}
                    </div>
                    <input
                        type="${param.type === 'number' ? 'number' : 'text'}"
                        placeholder="${param.description || key}"
                        value="${param.default || ''}"
                        class="param-input w-full p-2 text-sm bg-slate-50 dark:bg-dark-700 rounded-md"
                        data-key="${key}"
                    />
                    ${param.description ? `
                        <p class="param-description mt-1 text-xs text-slate-500 dark:text-dark-500">
                            ${param.description}
                        </p>
                    ` : ''}
                </div>
            </div>
        `);

        const input = field.querySelector('.param-input');
        input.addEventListener('input', (e) => {
            const value = e.target.type === 'number' ? 
                e.target.value ? Number(e.target.value) : '' : 
                e.target.value;
            onChange(key, value);
        });

        if (param.default) {
            onChange(key, param.type === 'number' ? Number(param.default) : param.default);
        }

        paramsList.appendChild(field);
    });

    return container;
}