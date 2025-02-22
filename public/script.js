async function signup() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const res = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    alert(data.message);
}

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        if (data.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'index.html';
        }
    } else {
        alert(data.message);
    }
}

async function fetchUserData() {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Access Denied');
        window.location.href = 'login.html';
        return;
    }

    const res = await fetch('/user-dashboard', {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    if (res.status === 403) {
        alert('Access Denied');
        window.location.href = 'login.html';
    } else {
        document.getElementById('username').textContent = data.user.username;
        document.getElementById('email').textContent = data.user.email;
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = 'login.html';
}

if (window.location.pathname.includes('index.html')) {
    fetchUserData();
}