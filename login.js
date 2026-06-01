// Login Button
document.getElementById("loginBtn").addEventListener("click", () => {
  const btn = document.getElementById("loginBtn");
  btn.style.animation = 'fadeScale 0.5s ease';
  
  const email = document.getElementById('emailInput').value.toLowerCase();
  const password = document.getElementById('passwordInput').value;

  setTimeout(() => {
    if (email.includes('admin')) {
      window.location.href = "admin.html";
    } else if (email.includes('investor')) {
      window.location.href = "investorhome.html";
    } else {
      window.location.href = "studenthome.html";
    }
  }, 300);
});

