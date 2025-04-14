document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    function handleLogin(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('login-username');
        const passwordInput = document.getElementById('login-password');
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && password) {
            console.log('Login successful (simulated)');
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            alert('Please enter both username and password.');
        }
    }

    function handleRegister(event) {
        event.preventDefault();
        const usernameInput = document.getElementById('register-username');
        const emailInput = document.getElementById('register-email');
        const passwordInput = document.getElementById('register-password');
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && email && password) {
            console.log('Registration successful (simulated)');
            window.location.href = 'login.html';
        } else {
            alert('Please fill in all registration details.');
        }
    }
});