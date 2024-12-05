export const dom = {
    createElement(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    },

    removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    },

    // Helper for handling class toggling
    toggleClass(element, className, force) {
        if (force === undefined) {
            element.classList.toggle(className);
        } else {
            element.classList[force ? 'add' : 'remove'](className);
        }
    }
};