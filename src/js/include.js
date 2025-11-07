document.addEventListener("DOMContentLoaded", function () {
    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    const rootPath = isLocal ? "" : "/My-Portfolio";

    // Fix hrefs that start with "public/"
    document.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute("href");
        if (href?.startsWith("public/")) {
            // Use absolute path relative to the repo root
            a.setAttribute("href", rootPath + "/" + href.replace(/^\/?public\//, "public/"));
        }
    });

    // Handle HTML includes
    document.querySelectorAll('[data-include]').forEach(async element => {
        const file = element.getAttribute('data-include');
        const url = rootPath + "/" + file.replace(/^\/+/, "");

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch " + url);
            const data = await response.text();
            element.innerHTML = data;

            // Reattach menu listeners inside the included header
            const menuBtn = document.getElementById('menuBtn');
            const mobileMenu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('overlay');

            if (menuBtn && mobileMenu && overlay) {
                menuBtn.addEventListener("click", () => {
                    mobileMenu.classList.toggle('-translate-x-full');
                    mobileMenu.classList.toggle('-translate-x-0');
                    overlay.classList.toggle('hidden');
                });

                overlay.addEventListener("click", () => {
                    mobileMenu.classList.toggle('-translate-x-full');
                    mobileMenu.classList.toggle('-translate-x-0');
                    overlay.classList.toggle('hidden');
                });
            }

        } catch (error) {
            console.error("Include failed:", error);
        }
    });
});
