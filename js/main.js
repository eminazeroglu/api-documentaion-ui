import { store, actions } from './state.js';
import { eventBus, EVENT_TYPES } from './events.js';
import { Sidebar } from './components/sidebar/index.js';
import { MainContent } from './components/mainContent/index.js';
import { TestPanel } from './components/testPanel/index.js';
import { DocumentConfig } from './components/DocumentConfig.js';
import { TokenManager } from './components/auth/TokenManager.js';
import { api } from './utils/api.js';
import { themeManager } from './utils/theme.js';

class App {
    constructor() {
        this.init();
    }

    async init() {
        // Initialize theme system
        themeManager.init();

        // Initialize components
        this.initializeComponents();

        // Load initial data
        await this.loadInitialData();

        // Set up global error handling
        this.setupErrorHandling();
    }

    initializeComponents() {
        this.components = {
            documentConfig: new DocumentConfig(),
            sidebar: new Sidebar(),
            mainContent: new MainContent(),
            testPanel: new TestPanel(),
            tokenManager: new TokenManager()
        };
    }

    async loadInitialData() {
        try {
            const data = await api.getDocumentation();
            actions.setData(data);
            eventBus.emit(EVENT_TYPES.DATA_LOADED, data);
        } catch (error) {
            console.error('Failed to load API documentation:', error);
            eventBus.emit(EVENT_TYPES.ERROR_OCCURRED, {
                message: 'Failed to load API documentation',
                details: error.message
            });
            this.showErrorMessage('Failed to load API documentation. Please try again later.');
        }
    }

    setupErrorHandling() {
        eventBus.on(EVENT_TYPES.ERROR_OCCURRED, (error) => {
            console.error('Application error:', error);
            this.showErrorMessage(error.message);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            eventBus.emit(EVENT_TYPES.ERROR_OCCURRED, {
                message: 'An unexpected error occurred',
                details: event.reason.message
            });
        });
    }

    showErrorMessage(message) {
        // Burada error notification sistemi əlavə edilə bilər
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-notification fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50';
        errorContainer.textContent = message;
        
        document.body.appendChild(errorContainer);
        
        setTimeout(() => {
            errorContainer.remove();
        }, 5000);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});