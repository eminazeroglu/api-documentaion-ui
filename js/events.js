class EventEmitter {
    constructor() {
        this.events = {};
    }

    // Subscribe to an event
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);

        // Return unsubscribe function
        return () => this.off(event, callback);
    }

    // Unsubscribe from an event
    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    }

    // Emit an event
    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in event ${event}:`, error);
            }
        });
    }

    // Remove all event listeners
    removeAllListeners(event) {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
    }
}

// Create and export events instance
export const eventBus = new EventEmitter();

// Event types constants
export const EVENT_TYPES = {
    ENDPOINT_SELECTED: 'ENDPOINT_SELECTED',
    SEARCH_UPDATED: 'SEARCH_UPDATED',
    TAG_TOGGLED: 'TAG_TOGGLED',
    DATA_LOADED: 'DATA_LOADED',
    REQUEST_SENT: 'REQUEST_SENT',
    RESPONSE_RECEIVED: 'RESPONSE_RECEIVED',
    ERROR_OCCURRED: 'ERROR_OCCURRED'
};

// Usage example:
/*
import { eventBus, EVENT_TYPES } from './events.js';

// Subscribe to an event
const unsubscribe = eventBus.on(EVENT_TYPES.ENDPOINT_SELECTED, (endpoint) => {
    console.log('Selected endpoint:', endpoint);
});

// Emit an event
eventBus.emit(EVENT_TYPES.ENDPOINT_SELECTED, { path: '/api/users', method: 'GET' });

// Unsubscribe when needed
unsubscribe();
*/