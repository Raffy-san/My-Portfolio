const text ="A showcase of the websites and systems I've built.";
let index = 0;

function typeEffect () {
    if(index < text.length) {
        document.getElementById('typing').textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 80);
    }
}

typeEffect();