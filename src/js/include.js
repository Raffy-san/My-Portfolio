document.addEventListener("DOMContentLoaded", function () {
    // Detect if running locally or on GitHub Pages
    const isLocal = ["127.0.0.1", "localhost"].includes(window.location.hostname);

    // Base root for HTML pages (where /public/ actually exists)
    const rootPath = isLocal ? "/public" : "/My-Portfolio/public";

    // --- Fix all internal links so they always start from the correct root ---
    document.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute("href");
        if (!href) return;

        // Skip external, hash, and mail links
        if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) return;

        // ✅ Force absolute path from rootPath (not relative to current folder)
        a.setAttribute("href", rootPath + "/" + href.replace(/^\/+/, ""));
    });

    // --- Include reusable components (like header/footer) ---
    document.querySelectorAll('[data-include]').forEach(async element => {
        const file = element.getAttribute('data-include');
        const url = (isLocal ? "" : "/My-Portfolio") + "/" + file.replace(/^\/+/, "");

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch " + url);
            const data = await response.text();
            element.innerHTML = data;

            // Reattach menu events (after include)
            const menuBtn = document.getElementById('menuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('overlay');

            if (menuBtn && mobileMenu && overlay) {
                const toggleMenu = () => {
                    mobileMenu.classList.toggle('-translate-x-full');
                    mobileMenu.classList.toggle('-translate-x-0');
                    overlay.classList.toggle('hidden');
                };
                menuBtn.addEventListener("click", toggleMenu);
                overlay.addEventListener("click", toggleMenu);
            }
        } catch (error) {
            console.error("Include failed:", error);
        }
    });
});
