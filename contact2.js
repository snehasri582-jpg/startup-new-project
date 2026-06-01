// ================= LOGOUT FUNCTION =================
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

// ================= CONTACT FORM =================
const form = document.getElementById("contactForm");
const msg = document.getElementById("successMsg");

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    msg.textContent = "Message sent successfully!";
    form.reset();
  });
}

// ================= MENU TOGGLE =================
function toggleMenu() {
  const nav = document.querySelector(".navbar-center");
  if (nav) {
    nav.classList.toggle("active");
  }
}

// ================= EMAIL CLICK =================
function handleEmailClick() {
  window.location.href = "mailto:support@startupcollab.in?subject=Support Request";
}

// ================= CALL CLICK =================
function handleCallClick() {
  const message = "Calling support at +91 70321 39423\n\nDial this number to speak with our support team (Mon-Fri, 9 AM - 6 PM).";
  alert(message);
  window.location.href = "tel:+917032139423";
}

/* HANDLE CHAT CLICK */
function handleChatClick() {
  alert("🎉 Live chat connected!\n\nYou are now connected with our support agent. How can we help you?");
  // In a real application, this would open a live chat widget
}

/* FORM SUBMISSION - MAIN FORM */
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate fields
  if (!name || !email || !subject || !message) {
    alert("❌ Please fill in all required fields");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("❌ Please enter a valid email address");
    return;
  }

  // Show success message
  alert(`✅ Thank you ${name}!\n\nYour message has been sent successfully. We'll get back to you at ${email} within 24 hours.`);

  // Reset form
  this.reset();
  
  // Optional: Log submission
  console.log("Message submitted:", { name, email, subject, message, timestamp: new Date() });
});

/* FORM SUBMISSION - BOTTOM FORM */
document.getElementById("bottomContactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("bottomName").value.trim();
  const email = document.getElementById("bottomEmail").value.trim();
  const subject = document.getElementById("bottomSubject").value.trim();
  const message = document.getElementById("bottomMessage").value.trim();

  // Validate fields
  if (!name || !email || !subject || !message) {
    alert("❌ Please fill in all required fields");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("❌ Please enter a valid email address");
    return;
  }

  // Show success message
  alert(`✅ Thank you ${name}!\n\nYour message has been sent successfully. We'll get back to you at ${email} within 24 hours.`);

  // Reset form
  this.reset();
  
  // Optional: Log submission
  console.log("Message submitted:", { name, email, subject, message, timestamp: new Date() });
});

/* TOGGLE MENU */
function toggleMenu() {
  const nav = document.querySelector(".navbar-center");
  nav.classList.toggle("active");
}

/* ENHANCED INTERACTIVITY */

// Add focus effects to form inputs
document.querySelectorAll(".form-input, .form-textarea").forEach(input => {
  input.addEventListener("focus", function() {
    this.style.background = "#fff";
  });

  input.addEventListener("blur", function() {
    if (!this.value) {
      this.style.background = "#f9f9f9";
    }
  });
});

// Smooth scroll for option cards on click
document.querySelectorAll(".option-card").forEach(card => {
  card.addEventListener("mouseenter", function() {
    this.style.transform = "translateY(-4px)";
  });

  card.addEventListener("mouseleave", function() {
    this.style.transform = "translateY(0)";
  });
});

// Track form interactions
document.getElementById("contactForm").addEventListener("change", function() {
  console.log("Form modified");
});

// Auto-save form data to localStorage
function saveFormData() {
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };
  localStorage.setItem("contactFormData", JSON.stringify(formData));
}

// Load saved form data on page load
function loadFormData() {
  const saved = localStorage.getItem("contactFormData");
  if (saved) {
    const data = JSON.parse(saved);
    if (data.name) document.getElementById("name").value = data.name;
    if (data.email) document.getElementById("email").value = data.email;
    if (data.subject) document.getElementById("subject").value = data.subject;
    if (data.message) document.getElementById("message").value = data.message;
  }
}

// Save form data on input
document.getElementById("contactForm").addEventListener("input", saveFormData);

// Load form data on page load
window.addEventListener("load", loadFormData);

// Clear saved data after successful submission
document.getElementById("contactForm").addEventListener("submit", function() {
  localStorage.removeItem("contactFormData");
});
