// 1. ИНИЦИАЛИЗАЦИЯ SUPABASE
const SUPABASE_URL = 'https://hhfwrtmcdhyemrirnsjc.supabase.co'; 
const SUPABASE_KEY = 'sb_publishable_MarNd_W69hGqojLgHL0LJw_2V4WP6D7';
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. ИНИЦИАЛИЗАЦИЯ АНИМАЦИЙ (AOS)
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-back'
});

// 3. ЛОГИКА БУРГЕР-МЕНЮ (СТАРАЯ АНИМАЦИЯ)
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.onclick = () => navMenu.classList.add('active');
}
if (closeMenu) {
    closeMenu.onclick = () => navMenu.classList.remove('active');
}

// 4. СИСТЕМА АВТОРИЗАЦИИ И ПРАВ
const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
    loginBtn.onclick = () => {
        const userLogin = prompt("Логин:");
        const userPass = prompt("Пароль:");

        // Проверка твоих данных (пока без Auth-модуля, через локальную проверку)
        if (userLogin === "Administrator" && userPass === "Admin123") {
            alert("Доступ разрешен. Добро пожаловать, Команда форума!");
            localStorage.setItem('userRole', 'team'); // Выдаем краску КФ
            localStorage.setItem('userName', 'Administrator');
            location.reload(); 
        } else {
            alert("Ошибка доступа: Неверные данные!");
        }
    };
}

// ФУНКЦИЯ ПРИМЕНЕНИЯ РОЛЕЙ ПРИ ЗАГРУЗКЕ
function loadUserSession() {
    const role = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');

    if (role) {
        // Добавляем класс залогиненного пользователя
        document.body.classList.add('is-logged-in');
        
        // Если это Команда Форума — включаем Админ-Панель (АП)
        if (role === 'team') {
            document.body.classList.add('is-admin');
        }

        // Находим плашку ника в шапке и красим её
        const badge = document.getElementById('adminBadge');
        if (badge) {
            badge.innerText = name;
            badge.style.display = 'block';
            badge.className = `user-badge role-${role}`; // Применяет цвет из CSS
        }

        // Скрываем кнопку "Войти", так как мы уже внутри
        if (loginBtn) loginBtn.style.display = 'none';
    }
}
loadUserSession();

// 5. ФОНОВЫЕ ЧАСТИЦЫ (МЯТНЫЙ ЦВЕТ)
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5;
            this.speedY = Math.random() * 0.4 + 0.1; // Плавное движение вверх
        }
        update() {
            this.y -= this.speedY;
            if (this.y < 0) {
                this.y = canvas.height;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = 'rgba(152, 255, 211, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 80; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
}
