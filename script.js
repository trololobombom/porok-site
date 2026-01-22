// Инициализация анимаций
AOS.init({ duration: 1000, once: true });

// Меню
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const navMenu = document.getElementById('navMenu');

if(menuToggle) menuToggle.onclick = () => navMenu.classList.add('active');
if(closeMenu) closeMenu.onclick = () => navMenu.classList.remove('active');

// ЛОГИКА ВХОДА (Для теста)
const loginBtn = document.getElementById('loginBtn');
if(loginBtn) {
    loginBtn.onclick = () => {
        const user = prompt("Введите логин:");
        const pass = prompt("Введите пароль:");
        
        if(user === "Administrator" && pass === "Admin123") {
            alert("Доступ разрешен. Приветствуем, Команда форума!");
            localStorage.setItem('role', 'admin');
            location.reload();
        } else {
            alert("Ошибка доступа!");
        }
    };
}

// Проверка прав при загрузке
if(localStorage.getItem('role') === 'admin') {
    document.body.classList.add('is-admin');
    const badge = document.getElementById('adminBadge');
    if(badge) badge.style.display = 'block';
    const lBtn = document.getElementById('loginBtn');
    if(lBtn) lBtn.style.display = 'none';
}

// Частицы
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
class P {
    constructor() {
        this.x = Math.random()*canvas.width;
        this.y = Math.random()*canvas.height;
        this.s = Math.random()*1.5;
        this.vy = Math.random()*0.5 + 0.1;
    }
    update() {
        this.y -= this.vy;
        if(this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(152, 255, 211, 0.3)';
        ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI*2); ctx.fill();
    }
}
for(let i=0; i<100; i++) particles.push(new P());
function anim() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(anim);
}
anim();
window.onresize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
