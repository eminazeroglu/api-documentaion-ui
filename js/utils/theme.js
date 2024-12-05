export const themeManager = {
    THEME_KEY: 'preferred-theme',
    
    init() {
        // Theme toggle button-u tap
        this.toggleButton = document.querySelector('.theme-toggle');
        if (!this.toggleButton) {
            console.error('Theme toggle button not found');
            return;
        }

        // Saved theme-i yoxla
        const savedTheme = localStorage.getItem(this.THEME_KEY);
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }

        // Button click
        this.toggleButton.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });

        // System theme dəyişikliyini dinlə
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            this.setTheme(e.matches ? 'dark' : 'light');
        });
    },

    setTheme(theme) {
        // HTML elementinə dark class əlavə et/sil
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }
        
        // Theme-i localStorage-də saxla
        localStorage.setItem(this.THEME_KEY, theme);
        
        // Meta tag-ı yenilə
        document.documentElement.style.colorScheme = theme;
        
        // Button ikonunu yenilə
        this.updateButtonIcon(theme);
        
        // Custom event emit et
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));
    },

    updateButtonIcon(theme) {
        if (!this.toggleButton) return;

        const lightIcon = `
            <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
        `;

        const darkIcon = `
            <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
        `;

        this.toggleButton.innerHTML = theme === 'dark' ? darkIcon : lightIcon;
    }
};