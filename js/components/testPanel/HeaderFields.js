import { dom } from "../../utils/dom.js";

export function createHeaderFields({ headers, onChange }) {
    const container = dom.createElement(`
        <div class="headers-container space-y-3">
            <div class="headers-title flex justify-between items-center">
                <label class="text-sm font-medium text-slate-700 dark:text-dark-300">Headers</label>
                <button type="button" class="add-header-btn text-sm text-blue-500 hover:text-blue-600">
                    + Add Header
                </button>
            </div>
            <div class="headers-list space-y-2"></div>
        </div>
    `);

    function renderHeaders() {
        const headersList = container.querySelector('.headers-list');
        headersList.innerHTML = headers.map((header, index) => `
            <div class="header-item flex gap-2 items-center">
                <input
                    type="text"
                    placeholder="Key"
                    value="${header.key}"
                    class="header-key flex-1 p-2 text-sm bg-slate-50 dark:bg-dark-700 rounded-md"
                    data-index="${index}"
                    data-field="key"
                />
                <input
                    type="text"
                    placeholder="Value"
                    value="${header.value}"
                    class="header-value flex-1 p-2 text-sm bg-slate-50 dark:bg-dark-700 rounded-md"
                    data-index="${index}"
                    data-field="value"
                />
                ${headers.length > 1 ? `
                    <button type="button" 
                        class="remove-header text-red-500 hover:text-red-600" 
                        data-index="${index}">×</button>
                ` : ''}
            </div>
        `).join('');
    }

    renderHeaders();

    container.querySelector('.add-header-btn').addEventListener('click', () => {
        headers.push({ key: '', value: '' });
        onChange([...headers]);
        renderHeaders();
    });

    container.querySelector('.headers-list').addEventListener('click', (e) => {
        if (e.target.matches('.remove-header')) {
            const index = parseInt(e.target.dataset.index);
            headers.splice(index, 1);
            onChange([...headers]);
            renderHeaders();
        }
    });

    container.querySelector('.headers-list').addEventListener('input', (e) => {
        if (e.target.matches('input')) {
            const index = parseInt(e.target.dataset.index);
            const field = e.target.dataset.field;
            headers[index][field] = e.target.value;
            onChange([...headers]);
        }
    });

    return container;
}