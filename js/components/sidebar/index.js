import { store, actions } from '../../state.js';
import { eventBus, EVENT_TYPES } from '../../events.js';
import { dom } from '../../utils/dom.js';
import { createSearchInput } from './SearchInput.js';
import { createTagSection } from './TagSection.js';

export class Sidebar {
    constructor() {
        this.container = document.querySelector('.app-sidebar');
        this.searchContainer = this.container.querySelector('.search-container');
        this.apiSections = this.container.querySelector('.api-sections');
        this.data = null;
        this.init();
    }

    init() {
        const searchInput = createSearchInput({
            onSearch: (term) => this.handleSearch(term)
        });

        if (this.searchContainer) {
            this.searchContainer.innerHTML = '';
            this.searchContainer.appendChild(searchInput);
        }

        store.subscribe((newState, oldState) => {
            if (newState.data !== oldState.data) {
                this.data = newState.data;
                this.renderSections(newState.data.elements);
            }
        });
    }

    handleSearch(searchTerm) {
        if (!this.data?.elements || !this.apiSections) return;

        this.apiSections.innerHTML = '';

        this.data.elements.forEach(tagSection => {
            // Hər tag section üçün yeni filteredEndpoints obyekti yaradırıq
            const filteredEndpoints = {};
            let hasMatchingEndpoints = false;

            // Tag section-dakı bütün endpoint-ləri filter edirik
            Object.entries(tagSection.endpoints).forEach(([path, methods]) => {
                const matchingMethods = {};

                Object.entries(methods).forEach(([method, details]) => {
                    // Axtarış şərtləri
                    const searchString = searchTerm.toLowerCase();
                    const matchPath = path.toLowerCase().includes(searchString);
                    const matchSummary = details.summary?.toLowerCase().includes(searchString);
                    const matchDescription = details.description?.toLowerCase().includes(searchString);

                    if (matchPath || matchSummary || matchDescription) {
                        matchingMethods[method] = details;
                        hasMatchingEndpoints = true;
                    }
                });

                if (Object.keys(matchingMethods).length > 0) {
                    filteredEndpoints[path] = matchingMethods;
                }
            });

            // Əgər uyğun endpoint varsa, section yaradırıq
            if (hasMatchingEndpoints) {
                const section = createTagSection({
                    tag: tagSection.tag,
                    endpoints: filteredEndpoints,
                    expanded: searchTerm.length > 0,
                    onSelectEndpoint: (endpoint) => {
                        actions.setSelectedEndpoint(endpoint);
                        eventBus.emit(EVENT_TYPES.ENDPOINT_SELECTED, endpoint);
                    }
                });
                this.apiSections.appendChild(section);
            }
        });

        // Əgər heç bir nəticə yoxdursa
        if (this.apiSections.children.length === 0 && searchTerm.length > 0) {
            const noResults = dom.createElement(`
                <div class="no-results p-4 text-center text-slate-500 dark:text-dark-400">
                    No results found for "${searchTerm}"
                </div>
            `);
            this.apiSections.appendChild(noResults);
        }
    }

    renderSections(elements) {
        if (!elements || !this.apiSections) return;
        
        this.apiSections.innerHTML = '';

        elements.forEach(el => {
            const section = createTagSection({
                tag: el.tag,
                endpoints: el.endpoints,
                expanded: false,
                onSelectEndpoint: (endpoint) => {
                    actions.setSelectedEndpoint(endpoint);
                    eventBus.emit(EVENT_TYPES.ENDPOINT_SELECTED, endpoint);
                }
            });
            this.apiSections.appendChild(section);
        });
    }
}