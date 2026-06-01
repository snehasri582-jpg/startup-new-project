 let selectedRole = 'student';

// Select Role Tab
function selectRole(element, role) {
  document.querySelectorAll('.role-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  element.classList.add('active');
  selectedRole = role;
  
  // Trigger animation
  element.style.animation = 'none';
  setTimeout(() => {
    element.style.animation = 'fadeScale 0.4s ease';
  }, 10);
}

// Create Account Redirect based on role
function createAccountRedirect(event) {
  event.preventDefault();
  if (selectedRole === "student") {
    window.location.href = "new.html";
  } else if (selectedRole === "investor") {
    window.location.href = "cret2.html";
  } else if (selectedRole === "admin") {
    alert("Admin accounts can only be created by administrators.");
  }
}

// Switch Auth Tab
function switchTab(element, tab) {
  document.querySelectorAll('.auth-tab').forEach(t => {
    t.classList.remove('active');
  });
  if(element) element.classList.add('active');
  
  const loginContainer = document.getElementById('loginFormContainer');
  const signupContainer = document.getElementById('signupFormContainer');
  
  if (tab === 'signup') {
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
    
    signupContainer.style.animation = 'none';
    setTimeout(() => {
      signupContainer.style.animation = 'fadeScale 0.4s ease';
    }, 10);
  } else {
    loginContainer.style.display = 'block';
    signupContainer.style.display = 'none';
    
    // Trigger animation
    if(element) {
      element.style.animation = 'none';
      setTimeout(() => {
        element.style.animation = 'fadeScale 0.4s ease';
      }, 10);
    }
    
    // Animate form fields
    document.querySelectorAll('#loginFormContainer .input-group').forEach((input, index) => {
      input.style.animation = 'none';
      setTimeout(() => {
        input.style.animation = `slideIn 0.3s ease ${index * 0.1}s backwards`;
      }, 10);
    });
  }
}

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

