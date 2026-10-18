(async () => {
    const DEFAULT_SB3_URL = "https://cattymod.app/assets/default.sb3";

    // Wait for VM helper
    const waitForVM = () => new Promise(resolve => {
        if (window.vm) return resolve();
        const interval = setInterval(() => {
            if (window.vm) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });

    // Load project function (reusable)
    async function loadDefaultProject() {
        try {
            await waitForVM();

            const response = await fetch(DEFAULT_SB3_URL);
            if (!response.ok) throw new Error(`Failed to fetch SB3 file: ${response.status}`);

            const arrayBuffer = await response.arrayBuffer();
            await window.vm.loadProject(arrayBuffer);

            console.log("✅ CattyMod default project loaded!");
        } catch (err) {
            console.error("❌ Error loading CattyMod project:", err);
        }
    }

    // ✅ Hook "New" button and completely override site behavior
    if (!window.__customNewHookInstalled) {
        window.__customNewHookInstalled = true;

        document.addEventListener("click", function (e) {
            const li = e.target.closest('li.menu_menu-item_3EwYA.menu_hoverable_3u9dt.menu_menu-section_2U-v6');
            if (!li) return;

            const span = li.querySelector("span");
            if (!span || span.textContent.trim() !== "New") return;

            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();

            const ok = confirm("Replace contents of the current project?");
            if (!ok) return;

            setTimeout(() => {
                loadDefaultProject();
            }, 400);
        }, true);
    }

    // ✅ Only load on page load if:
    // - no project_url param
    // - AND no numeric hash like #123
    window.addEventListener("load", async () => {
        const params = new URLSearchParams(window.location.search);
        const projectURL = params.get("project_url");

        const hash = window.location.hash;
        const hasNumericHash = /^#\d+$/.test(hash);

        if (!projectURL && !hasNumericHash) {
            await loadDefaultProject();
        } else {
            console.log("⏭ Skipping default project (project_url or numeric hash detected)");
        }
    });

})();
