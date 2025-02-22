document.addEventListener('DOMContentLoaded', () => {
    const createAdminBtn = document.getElementById('create-admin-btn');
    const message = document.getElementById('message');
  
    createAdminBtn.addEventListener('click', async () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (!username || !password) {
        message.textContent = 'Please fill in all fields';
        return;
      }
  
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          window.location.href = '/login.html'; // Redirect to login if no token
          return;
        }
  
        const response = await fetch('http://localhost:5000/create-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          message.textContent = data.message || 'Admin created successfully';
          message.style.color = '#28a745';
        } else {
          message.textContent = data.message || 'Failed to create admin';
          message.style.color = '#dc3545';
        }
      } catch (error) {
        message.textContent = 'An error occurred. Please try again.';
        message.style.color = '#dc3545';
      }
    });
  });