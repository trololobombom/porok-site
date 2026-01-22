// Инициализация анимаций появления
AOS.init({
    duration: 1000,
    once: false, // Чтобы анимация срабатывала каждый раз при скролле вверх/вниз
    mirror: true
});

// Мятные частицы
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0; else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0; else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(152, 255, 211, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 90; i++) particlesArray.push(new Particle());
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

// Бургер меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if(menuToggle) {
    menuToggle.onclick = () => { navMenu.classList.toggle('active'); };
}

init();
animate();

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
};
