AOS.init({ duration: 1200, once: true });

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const particleColor = 'rgba(152, 255, 211, 0.4)'; // Мятный цвет

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
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
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 90; i++) { particlesArray.push(new Particle()); }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}

// Меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.onclick = () => {
    navMenu.classList.toggle('active');
};

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Запоминаем: кнопка сообщества перенаправляет на форум
document.querySelector('.community-btn').addEventListener('click', function(e) {
    console.log('Redirecting to forum...');
});
