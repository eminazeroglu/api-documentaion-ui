// Initial state
const initialState = {
    data: null,
    selectedEndpoint: null,
    searchQuery: '',
    expandedTags: [],
    headers: [{ key: '', value: '' }],
    requestBody: {},
    response: null
};

class Store {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.subscribers = new Map();
    }

    // Get current state
    getState() {
        return this.state;
    }

    // Update state
    setState(newState) {
        const oldState = { ...this.state };
        this.state = { ...this.state, ...newState };
        
        // Notify subscribers about changes
        this.notify(oldState);
    }

    // Subscribe to state changes
    subscribe(callback) {
        const id = Symbol();
        this.subscribers.set(id, callback);
        return () => this.subscribers.delete(id);
    }

    // Notify all subscribers
    notify(oldState) {
        this.subscribers.forEach(callback => callback(this.state, oldState));
    }
}

// Create and export store instance
export const store = new Store(initialState);

// Action creators
export const actions = {
    setData: (data) => store.setState({ data }),
    setSelectedEndpoint: (endpoint) => store.setState({ selectedEndpoint: endpoint }),
    setSearchQuery: (query) => store.setState({ searchQuery: query }),
    toggleTag: (tag) => {
        const expandedTags = store.getState().expandedTags;
        const newTags = expandedTags.includes(tag)
            ? expandedTags.filter(t => t !== tag)
            : [...expandedTags, tag];
        store.setState({ expandedTags: newTags });
    },
    setHeaders: (headers) => store.setState({ headers }),
    setRequestBody: (body) => store.setState({ requestBody: body }),
    setResponse: (response) => store.setState({ response })
};

// Subscribe to state changes example
/*
store.subscribe((newState, oldState) => {
    if (newState.selectedEndpoint !== oldState.selectedEndpoint) {
        // Handle endpoint change
    }
});
*/