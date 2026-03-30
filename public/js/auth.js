
// проверка авторизации
function checkAuth() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        const userNameSpan = document.getElementById('user-name');
        if (userNameSpan) {
            userNameSpan.textContent = userData.login;
        }
        return true;
    }
    return false;
}

// выход из системы
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// форма входа
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const messageDiv = document.getElementById('message');
        
        try {
            const response = await fetch(`/api.php/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user));
                messageDiv.className = 'message success';
                messageDiv.textContent = 'Вход выполнен успешно! Перенаправление...';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                messageDiv.className = 'message error';
                messageDiv.textContent = data.error || 'Ошибка входа';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Ошибка соединения с сервером';
        }
    });
}

// форма регистрации
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const messageDiv = document.getElementById('message');
        
        if (password !== confirmPassword) {
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Пароли не совпадают';
            return;
        }
        
        try {
            const response = await fetch(`/api.php/reg`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                messageDiv.className = 'message success';
                messageDiv.textContent = 'Регистрация успешна! Перенаправление на вход...';
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1500);
            } else {
                messageDiv.className = 'message error';
                messageDiv.textContent = data.error || 'Ошибка регистрации';
            }
        } catch (error) {
            console.error('Ошибка:', error);
            messageDiv.className = 'message error';
            messageDiv.textContent = 'Ошибка соединения с сервером';
        }
    });
}

// выход
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}

// проверка при запуске
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = checkAuth();
    const userInfo = document.getElementById('user-info');
    
    if (userInfo) {
        if (!isLoggedIn) {
            userInfo.innerHTML = '<a href="login.html" class="login-link">Войти</a>';
        }
    }
});