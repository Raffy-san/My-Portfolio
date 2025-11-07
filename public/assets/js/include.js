document.addEventListener("DOMContentLoaded", async () => {
    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    const basePath = isLocal ? "/public" : "/My-Portfolio/public";

    const includeElements = document.querySelectorAll("[data-include]");

    for (const el of includeElements) {
        const file = el.getAttribute("data-include");

        // Build full path to file
        const url = `${basePath}/${file.replace(/^\/+/, "")}`;
        console.log("Fetching include from:", url); // 👈 check this in browser console

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
            const html = await res.text();
            el.innerHTML = html;

            // Fix all links inside included header/footer
            el.querySelectorAll("a[href]").forEach(a => {
                const href = a.getAttribute("href");
                if (!href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto:")) {
                    a.setAttribute("href", `${basePath}/${href.replace(/^\/+/, "")}`);
                }
            });

            // Reattach menu button behavior if exists
            const menuBtn = document.getElementById("menuBtn");
            const mobileMenu = document.getElementById("mobileMenu");
            const overlay = document.getElementById("overlay");

            if (menuBtn && mobileMenu && overlay) {
                menuBtn.addEventListener("click", () => {
                    mobileMenu.classList.toggle("-translate-x-full");
                    overlay.classList.toggle("hidden");
                });
                overlay.addEventListener("click", () => {
                    mobileMenu.classList.toggle("-translate-x-full");
                    overlay.classList.toggle("hidden");
                });
            }
        } catch (err) {
            console.error("Include failed:", err);
        }
    }
});
