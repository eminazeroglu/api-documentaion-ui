import { dom } from '../../utils/dom.js';

export function createSearchInput({ onSearch }) {
    const wrapper = dom.createElement(`
        <div class="search-box relative">
            <input
                type="text"
                placeholder="Search APIs..."
                class="search-input w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-dark-700 border-0 rounded-md text-sm"
            />
            <svg class="search-icon absolute left-3 top-2.5 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
    `);

    const input = wrapper.querySelector('.search-input');
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        onSearch(searchTerm);
    });

    return wrapper;
}