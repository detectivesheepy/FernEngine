(function () {
    function removeAll() {
        // Remove Addon Feedback button
        const feedback = document.querySelector(
            'a[href="https://scratch.mit.edu/users/GarboMuffin/#comments"].settings_feedback-button-outer_3RXeq'
        );
        if (feedback) feedback.remove();

        // Remove "Better text blocks" library item
        const items = document.querySelectorAll(
            "div.library-item_library-item_1DcMO.library-item_featured-item_3V2-t.library-item_library-item-extension_3xus9"
        );

        items.forEach(el => {
            if (el.textContent.includes("Better text blocks")) {
                el.remove();
            }
        });
    }

    // Run immediately
    removeAll();

    // Keep watching for Scratch re-adding elements
    const observer = new MutationObserver(removeAll);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
