import { dom } from '../../utils/dom.js';
import { createEndpointButton } from './EndpointButton.js';  // default import əvəzinə named import

export function createTagSection({ tag, endpoints, expanded, onSelectEndpoint }) {
    const section = dom.createElement(`
        <div class="tag-section">
            <button class="tag-header flex items-center justify-between w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-dark-700">
                <span class="tag-name font-medium text-slate-700 dark:text-dark-300">${tag}</span>
                <svg class="tag-icon w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="endpoint-list pl-4 ${expanded ? '' : 'hidden'}">
            </div>
        </div>
    `);

    const button = section.querySelector('.tag-header');
    const endpointList = section.querySelector('.endpoint-list');
    const tagIcon = section.querySelector('.tag-icon');

    button.addEventListener('click', () => {
        endpointList.classList.toggle('hidden');
        tagIcon.classList.toggle('rotate-90');
    });

    Object.entries(endpoints).forEach(([path, methods]) => {
        Object.entries(methods).forEach(([method, details]) => {
            const endpoint = createEndpointButton({
                path,
                method,
                details,
                onClick: () => onSelectEndpoint({ path, method, details })
            });
            endpointList.appendChild(endpoint);
        });
    });

    return section;
}