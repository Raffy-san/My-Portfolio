document.addEventListener("DOMContentLoaded", function () {
    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    const rootPath = isLocal ? "" : "/My-Portfolio/public";

    document.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute("href");
        if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto:")) {
            // Normalize to avoid double "public/"
            a.setAttribute("href", rootPath + "/" + href.replace(/^\/+|^public\//, ""));
        }
    });

    document.querySelectorAll('[data-include]').forEach(async element => {
        const file = element.getAttribute('data-include');
        const url = rootPath + "/" + file.replace(/^\/+|^public\//, "");

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch " + url);
            const data = await response.text();
            element.innerHTML = data;

            // Reattach menu event listeners inside header
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
