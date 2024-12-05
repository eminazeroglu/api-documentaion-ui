export const tokenUtils = {
    TOKEN_KEY: 'api_token',

    setToken(token) {
        localStorage.setItem(this.TOKEN_KEY, token);
        // Dispatch storage event for cross-tab communication
        window.dispatchEvent(new Event('storage'));
    },

    getToken() {
        return localStorage.getItem(this.TOKEN_KEY);
    },

    removeToken() {
        localStorage.removeItem(this.TOKEN_KEY);
        window.dispatchEvent(new Event('storage'));
    },

    hasToken() {
        return !!this.getToken();
    }
};