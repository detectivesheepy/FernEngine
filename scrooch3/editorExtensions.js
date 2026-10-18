(() => {
    const extensionCardSelector = '[class*="library-item_library-item-extension"]';
    const extensionNameSelector = '[class*="library-item_library-item-name"]';

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

        });
    }

    updateExtensionPicker();
    new MutationObserver(updateExtensionPicker).observe(document.body, {
        childList: true,
        subtree: true
    });
})();
