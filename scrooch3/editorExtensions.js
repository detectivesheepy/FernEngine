(() => {
    const extensionCardSelector = '[class*="library-item_library-item-extension"]';
    const extensionNameSelector = '[class*="library-item_library-item-name"]';
    const placeholderAttribute = 'data-fernengine-placeholder-extension';

    function createPlaceholderCard() {
        const card = document.createElement('div');
        card.className = [
            'library-item_library-item_1DcMO',
            'library-item_featured-item_3V2-t',
            'library-item_library-item-extension_3xus9',
            'library-item_disabled_1-aDH'
        ].join(' ');
        card.setAttribute(placeholderAttribute, '');
        card.setAttribute('aria-disabled', 'true');

        const text = document.createElement('div');
        text.className = 'library-item_featured-text_2KFel';

        const name = document.createElement('div');
        name.className = 'library-item_library-item-name_2qMXu';
        name.textContent = 'Placeholder';

        const description = document.createElement('div');
        description.className = 'library-item_featured-description_MjIJw';
        description.textContent = 'Extension placeholder';

        text.append(name, description);
        card.append(text);
        return card;
    }

    function updateExtensionPicker() {
        document.querySelectorAll('[class*="library-scroll-grid_"]').forEach(grid => {
            const cards = grid.querySelectorAll(extensionCardSelector);
            if (cards.length === 0) return;

            cards.forEach(card => {
                const name = card.querySelector(extensionNameSelector);
                if (name && name.textContent.trim() === 'OOP') {
                    card.remove();
                }
            });

            if (!grid.querySelector(`[${placeholderAttribute}]`)) {
                grid.append(createPlaceholderCard());
            }
        });
    }

    updateExtensionPicker();
    new MutationObserver(updateExtensionPicker).observe(document.body, {
        childList: true,
        subtree: true
    });
})();
