function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Store credentials in local storage
    const storedUsername = localStorage.getItem('username') || 'admin';
    const storedPassword = localStorage.getItem('password') || 'password';

    if (username === storedUsername && password === storedPassword) {
        // Redirect to resume page
        window.location.href = 'resume.html';
    } else {
        document.getElementById('error-message').innerText = 'Invalid username/password';
    }
}
