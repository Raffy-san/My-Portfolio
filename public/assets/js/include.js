document.addEventListener("DOMContentLoaded", function () {
    const includeElements = document.querySelectorAll('[data-include]');
    includeElements.forEach(function (element) {
        const file = element.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;

                const menuBtn = document.getElementById('menuBtn');
                const mobileMenu = document.getElementById('mobileMenu');
                const overlay = document.getElementById('overlay');

                menuBtn.addEventListener("click", () => {

                    mobileMenu.classList.toggle('-translate-x-full');
                    mobileMenu.classList.toggle('-translate-x-0');
                    overlay.classList.toggle('hidden');
                });
                overlay.addEventListener("click", () => {
                    mobileMenu.classList.toggle('-translate-x-full');
                    mobileMenu.classList.toggle('-translate-x-0');
                    overlay.classList.toggle('hidden');
                })
            });
    });
});