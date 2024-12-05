import { dom } from "../../utils/dom.js";

export function createRequestBodyField({ value, onChange }) {
    const container = dom.createElement(`
        <div class="request-body-container space-y-3">
            <div class="body-title flex justify-between items-center">
                <label class="text-sm font-medium text-slate-700 dark:text-dark-300">
                    Request Body
                </label>
            </div>
            <textarea
                class="body-content w-full p-3 text-sm font-mono bg-slate-50 dark:bg-dark-700 rounded-md"
                rows="8"
                placeholder="Enter JSON body"
            >${value}</textarea>
        </div>
    `);

    const textarea = container.querySelector('.body-content');
    textarea.addEventListener('input', (e) => onChange(e.target.value));

    return container;
}