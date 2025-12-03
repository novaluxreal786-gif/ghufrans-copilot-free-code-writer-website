// Authentication System

// Demo credentials
const DEMO_USER = {
    username: 'Ghufran',
    password: 'Ghufran108@'
};

// Initialize authentication
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const messageInput = document.getElementById('messageInput');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Auto-resize textarea
    if (messageInput) {
        messageInput.addEventListener('input', function() {
            this.style. height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Allow Enter to send, Shift+Enter for new line
        messageInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Check if user is already logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && window.location.pathname === '/' || window.location.pathname. includes('index.html')) {
        showDashboard(currentUser);
    }
});

// Login Handler
function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value. trim();
    const password = document.getElementById('password').value.trim();
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');

    // Clear previous errors
    usernameError.textContent = '';
    passwordError.textContent = '';

    // Validation
    if (!username) {
        usernameError.textContent = 'Username is required';
        return;
    }

    if (!password) {
        passwordError.textContent = 'Password is required';
        return;
    }

    // Check credentials
    if (username === DEMO_USER.username && password === DEMO_USER.password) {
        // Successful login
        localStorage.setItem('currentUser', username);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        // Show success animation
        const loginBtn = document.querySelector('.btn-login');
        loginBtn.innerHTML = '<i class="fas fa-check"></i> <span>Success! </span>';
        loginBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

        // Redirect to dashboard
        setTimeout(() => {
            showDashboard(username);
        }, 500);
    } else {
        // Failed login
        if (username !== DEMO_USER.username) {
            usernameError.textContent = 'Invalid username';
        }
        if (password !== DEMO_USER.password) {
            passwordError.textContent = 'Invalid password';
        }

        // Shake animation
        const loginBox = document.querySelector('.login-box');
        loginBox.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            loginBox.style.animation = '';
        }, 500);
    }
}

// Register Handler
function handleRegister(e) {
    e.preventDefault();

    const regUsername = document.getElementById('regUsername').value.trim();
    const regEmail = document.getElementById('regEmail'). value.trim();
    const regPassword = document.getElementById('regPassword').value.trim();
    const regConfirmPassword = document.getElementById('regConfirmPassword').value. trim();
    const terms = document.getElementById('terms').checked;

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    let isValid = true;

    // Validation
    if (!regUsername) {
        document.querySelectorAll('.error-message')[0].textContent = 'Username is required';
        isValid = false;
    } else if (regUsername.length < 3) {
        document. querySelectorAll('.error-message')[0].textContent = 'Username must be at least 3 characters';
        isValid = false;
    }

    if (!regEmail) {
        document.querySelectorAll('.error-message')[1].textContent = 'Email is required';
        isValid = false;
    } else if (!isValidEmail(regEmail)) {
        document.querySelectorAll('.error-message')[1].textContent = 'Please enter a valid email';
        isValid = false;
    }

    if (!regPassword) {
        document.querySelectorAll('.error-message')[2].textContent = 'Password is required';
        isValid = false;
    } else if (regPassword.length < 6) {
        document.querySelectorAll('.error-message')[2].textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (regPassword !== regConfirmPassword) {
        document.querySelectorAll('.error-message')[3]. textContent = 'Passwords do not match';
        isValid = false;
    }

    if (! terms) {
        alert('Please agree to the terms and conditions');
        isValid = false;
    }

    if (isValid) {
        // Store registration data
        const registrationData = {
            username: regUsername,
            email: regEmail,
            password: regPassword,
            registeredAt: new Date().toISOString()
        };

        // In a real app, this would be sent to a server
        console.log('Registration Data:', registrationData);

        // Send email notification (in real app)
        console.log(`Welcome email would be sent to: ${regEmail}`);

        // Show success message
        alert(`Welcome ${regUsername}! Registration successful. You can now login with your credentials.`);

        // Redirect to login
        goToLogin(e);
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Dashboard
function showDashboard(username) {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('registerPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
    document.getElementById('welcomeUser').textContent = `Welcome, ${username}`;
    document.getElementById('settingsUsername').textContent = username;
}

// Navigation Functions
function goToRegister(e) {
    e.preventDefault();
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('registerPage').classList.add('active');
}

function goToLogin(e) {
    e.preventDefault();
    document.getElementById('registerPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('loginForm').reset();
}

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('loginTime');
    document.getElementById('dashboardPage').classList.remove('active');
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('loginForm').reset();
}

// Theme Toggle
function toggleTheme() {
    document.body.classList. toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Load theme preference
window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.checked = true;
        }
    }
});