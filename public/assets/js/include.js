document.addEventListener("DOMContentLoaded", async function () {
    const isLocal = window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
    const basePath = isLocal ? "" : "/My-Portfolio";

    // Fix all <a href="public/..."> links to include basePath
    document.querySelectorAll("a").forEach(a => {
        const href = a.getAttribute("href");
        if (href && href.startsWith("public/")) {
            a.setAttribute("href", `${basePath}/${href.replace(/^\/+/, "")}`);
        }
    });

    // Handle [data-include]
    const includeElements = document.querySelectorAll("[data-include]");
    for (const element of includeElements) {
        const file = element.getAttribute("data-include");
        const url = `${basePath}/${file.replace(/^\/+/, "")}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch: ${url}`);
            const data = await response.text();
            element.innerHTML = data;

            // Reattach menu behavior
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
        } catch (error) {
            console.error("Include failed:", error);
        }
    }
});
