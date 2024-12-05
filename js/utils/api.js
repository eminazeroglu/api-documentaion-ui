import { tokenUtils } from './token.js';
import { ENV } from '../config/env.js';

export const api = {
    // Get API documentation
    async getDocumentation() {
        const response = await fetch(ENV.documentationURL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    // Send API request
    async sendRequest({ endpoint, headers = {}, body = null }) {
        const token = tokenUtils.getToken();
        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        };

        // Remove leading slash if exists
        const path = endpoint.path.startsWith('/') ? endpoint.path.slice(1) : endpoint.path;
        // Construct full URL
        const url = `${ENV.baseURL}${path}`;

        try {
            const method = endpoint.method.toUpperCase();
            
            // Request options
            const options = {
                method,
                headers: {
                    ...defaultHeaders,
                    ...headers
                }
            };

            // Add body only for non-GET/HEAD requests
            if (body && !['GET', 'HEAD'].includes(method)) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(url, options);

            const responseData = await response.json();

            // Create standardized response object
            const result = {
                status: response.status,
                data: responseData,
                headers: Object.fromEntries(response.headers.entries())
            };

            // If response is not ok, add error information but still return the response
            if (!response.ok) {
                if (response.status === 401) {
                    tokenUtils.removeToken();
                }
                result.error = responseData.message || 'Unknown error occurred';
            }

            return result;

        } catch (error) {
            // If there's a network error or other exception
            return {
                status: 500,
                error: error.message,
                data: null
            };
        }
    }
};