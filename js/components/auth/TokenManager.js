// js/components/auth/TokenManager.js
import { tokenUtils } from '../../utils/token.js';
import { eventBus, EVENT_TYPES } from '../../events.js';
import { dom } from '../../utils/dom.js';

export class TokenManager {
    constructor() {
        this.init();
    }

    init() {
        // Token container elementini tap
        this.container = document.querySelector('.authorization');
        if (!this.container) {
            console.error('Auth container not found');
            return;
        }

        this.createTokenButton();
        
        // Storage dəyişikliklərini dinlə
        window.addEventListener('storage', () => this.updateButtonState());
    }

    createTokenButton() {
        const hasToken = tokenUtils.hasToken();
        const button = dom.createElement(`
            <button class="token-button w-full p-3 rounded-md text-white transition-colors ${
                hasToken 
                    ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700' 
                    : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
            }">
                ${hasToken ? 'Logout' : 'Add Token'}
            </button>
        `);

        button.addEventListener('click', () => {
            if (hasToken) {
                tokenUtils.removeToken();
                this.updateButtonState();
                eventBus.emit(EVENT_TYPES.TOKEN_REMOVED);
            } else {
                this.showTokenPopup();
            }
        });

        // Əvvəlki buttonu təmizlə və yenisini əlavə et
        this.container.innerHTML = '';
        this.container.appendChild(button);
    }

    showTokenPopup() {
        const popup = dom.createElement(`
            <div class="token-popup fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="popup-content bg-white dark:bg-dark-800 rounded-lg p-6 max-w-md w-full mx-4">
                    <h2 class="text-xl font-bold mb-4 text-slate-900 dark:text-dark-50">Add API Token</h2>
                    <textarea 
                        id="tokenInput"
                        class="w-full p-3 text-sm font-mono bg-slate-50 dark:bg-dark-700 rounded-md h-32 mb-4"
                        placeholder="Paste your API token here"
                    ></textarea>
                    <div class="flex justify-end space-x-3">
                        <button 
                            id="cancelToken"
                            class="px-4 py-2 text-sm text-slate-600 dark:text-dark-400 hover:text-slate-800 dark:hover:text-dark-200"
                        >
                            Cancel
                        </button>
                        <button 
                            id="saveToken"
                            class="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Save Token
                        </button>
                    </div>
                </div>
            </div>
        `);

        document.body.appendChild(popup);

        // Handle save
        popup.querySelector('#saveToken').addEventListener('click', () => {
            const token = popup.querySelector('#tokenInput').value.trim();
            if (token) {
                tokenUtils.setToken(token);
                this.updateButtonState();
                eventBus.emit(EVENT_TYPES.TOKEN_RECEIVED);
                popup.remove();
            }
        });

        // Handle cancel
        popup.querySelector('#cancelToken').addEventListener('click', () => {
            popup.remove();
        });

        // Close on overlay click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.remove();
            }
        });
    }

    updateButtonState() {
        this.createTokenButton();
    }
}