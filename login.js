function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Store credentials in local storage
  const storedUsername = localStorage.getItem("username") || "admin";
  const storedPassword = localStorage.getItem("password") || "password";

  if (username === storedUsername && password === storedPassword) {
    // Redirect to resume page
    window.location.href = "resume.html";
    sessionStorage.setItem("loginResume", true);
  } else {
    document.getElementById("error-message").innerText =
      "Invalid username/password";
  }
}

const isLoggedIn = sessionStorage.getItem("loginResume");

if (isLoggedIn === "true") {
  window.location.href = "resume.html";
}

window.onpageshow = function (event) {
  if (event.persisted) {
    // This block is triggered when the page is loaded from the browser cache
    if (sessionStorage.getItem("loginResume") === "true") {
      window.location.href = "login.html";
    }
  }
};
