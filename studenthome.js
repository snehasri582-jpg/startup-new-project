// USER DATA
const userData = {
  name: "Amit Mehra",
  university: "Boston University",
  field: "Computer Science"
};

const startupsData = [
  {
    id: 1,
    name: "TechInnovate",
    description: "AI-powered education platform",
    views: 540,
    category: "tech"
  },
  {
    id: 2,
    name: "EcoCharge",
    description: "Sustainable electric vehicle charging station network",
    views: 370,
    category: "sustainability"
  }
];

const messagesData = [
  {
    id: 1,
    sender: "Rajesh Kapoor",
    message: "Interested in your AI startup",
    time: "2 hours ago",
    avatar: "👤"
  },
  {
    id: 2,
    sender: "Dr. Samantha Lee",
    message: "I'd like to discuss your new green energy project.",
    time: "5 hours ago",
    avatar: "👩"
  },
  {
    id: 3,
    sender: "Priya Singh",
    message: "Great work on the TechInnovate pitch",
    time: "1 day ago",
    avatar: "👩"
  },
  {
    id: 4,
    sender: "John Developer",
    message: "Want to collaborate on EcoCharge?",
    time: "2 days ago",
    avatar: "👨"
  }
];

const investorsData = [
  {
    id: 1,
    name: "Ajay Tandon",
    title: "Angel Investor. Funded 15 Startups",
    connections: "8 mutual connections",
    avatar: "👤"
  },
  {
    id: 2,
    name: "Lisa Chen",
    title: "VC at Seed Ventures",
    connections: "5 mutual connections",
    avatar: "👩"
  },
  {
    id: 3,
    name: "Michael Wong",
    title: "Venture Capitalist",
    connections: "12 mutual connections",
    avatar: "👨"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    title: "Partner at Tech Fund",
    connections: "3 mutual connections",
    avatar: "👩"
  }
];

const settingsData = {
  notifyEmail: true,
  notifyAlerts: true,
  profileVisibility: true,
  publicIdeas: false,
  showQuickActions: false,
  enableDarkMode: false
};

function initializeSettings() {
  Object.keys(settingsData).forEach(key => {
    const element = document.getElementById(key);
    if (element) {
      element.checked = settingsData[key];
    }
  });
  applyDashboardPreferences();
}

function updateSetting(key, value) {
  settingsData[key] = value;
  if (key === "enableDarkMode") {
    document.body.classList.toggle("dark-mode", value);
  }
  if (key === "showQuickActions") {
    document.querySelector(".dashboard-actions-full").style.display = value ? "grid" : "none";
  }
}

function showFullDashboard(event) {
  if (event) event.preventDefault();
  const fullSection = document.querySelector(".dashboard-actions-full");
  const isVisible = fullSection.style.display === "grid";
  fullSection.style.display = isVisible ? "none" : "grid";
  settingsData.showQuickActions = !isVisible;
  const checkbox = document.getElementById("showQuickActions");
  if (checkbox) checkbox.checked = !isVisible;
}

function saveSettings(event) {
  event.preventDefault();
  alert("✅ Your website settings have been saved.");
  console.log("Saved settings:", settingsData);
}

function applyDashboardPreferences() {
  const fullSection = document.querySelector(".dashboard-actions-full");
  if (fullSection) {
    fullSection.style.display = settingsData.showQuickActions ? "grid" : "none";
  }
  document.body.classList.toggle("dark-mode", settingsData.enableDarkMode);
}

let currentSlide = 0;
const totalSlides = 4;

function initializeDashboard() {
  initializeSettings();
  renderSliderDots();
  updateSlider();

  const backdrop = document.getElementById("sidebarBackdrop");
  if (backdrop) backdrop.addEventListener("click", closeSidebar);
  renderStudentIdeas();
}

function toggleSidebar() {
  const sidebar = document.getElementById("dashboardSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (!sidebar || !backdrop) return;
  const isOpen = sidebar.classList.toggle("open");
  backdrop.classList.toggle("open", isOpen);
  document.body.classList.toggle("sidebar-open", isOpen);
}

function closeSidebar() {
  const sidebar = document.getElementById("dashboardSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (!sidebar || !backdrop) return;
  sidebar.classList.remove("open");
  backdrop.classList.remove("open");
  document.body.classList.remove("sidebar-open");
}

function changeSlide(direction) {
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateSlider();
}

function updateSlider() {
  const track = document.getElementById("featureTrack");
  if (!track) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function renderSliderDots() {
  const dotsContainer = document.getElementById("sliderDots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";

  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot" + (i === currentSlide ? " active" : "");
    dot.setAttribute("aria-label", `Slide ${i + 1}`);
    dot.addEventListener("click", () => {
      currentSlide = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  }
}

window.addEventListener("load", initializeDashboard);

/* NAVIGATION HANDLER */
function handleNavClick(e, page) {
  // Direct navigation will happen automatically via href
  console.log("Navigating to: " + page);
}

/* LOGOUT HANDLER */
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    // Redirect to index.html (main home page)
    window.location.href = "index.html";
  }
}

/* TOGGLE MOBILE MENU */
function toggleMenu() {
  const nav = document.querySelector(".navbar-center");
  nav.classList.toggle("active");
}

/* EDIT PROFILE */
function editProfile(event) {
  if (event) event.preventDefault();
  
  const modal = document.getElementById("profileModal");
  document.getElementById("fullName").value = userData.name;
  document.getElementById("university").value = userData.university;
  document.getElementById("fieldOfStudy").value = userData.field;
  
  modal.classList.add("active");
}

function closeProfileModal() {
  const modal = document.getElementById("profileModal");
  modal.classList.remove("active");
}

document.getElementById("editProfileForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  userData.name = document.getElementById("fullName").value;
  userData.university = document.getElementById("university").value;
  userData.field = document.getElementById("fieldOfStudy").value;
  
  // Update UI
  document.querySelector(".name").textContent = userData.name;
  document.querySelector(".profile-info h2").textContent = userData.name;
  document.querySelector(".profile-info .university").textContent = userData.university;
  document.querySelector(".profile-info .field").textContent = userData.field;
  
  alert("✅ Profile updated successfully!");
  closeProfileModal();
});

/* CREATE STARTUP */
function createStartup(event) {
  if (event) event.preventDefault();
  
  const modal = document.getElementById("startupModal");
  document.getElementById("createStartupForm").reset();
  modal.classList.add("active");
}

function closeStartupModal() {
  const modal = document.getElementById("startupModal");
  modal.classList.remove("active");
}

document.getElementById("createStartupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const name = document.getElementById("startupName").value;
  const description = document.getElementById("startupDescription").value;
  const category = document.getElementById("startupCategory").value;
  
  const newStartup = {
    id: startupsData.length + 1,
    name: name,
    description: description,
    views: 0,
    category: category
  };
  
  startupsData.push(newStartup);
  
  alert(`✅ Startup "${name}" created successfully!`);
  closeStartupModal();
  
  console.log("New startup:", newStartup);
});

/* EDIT STARTUP */
function editStartup(button) {
  const startupItem = button.closest(".startup-item");
  const startupName = startupItem.querySelector("h4").textContent;
  
  alert(`✏️ Editing startup: ${startupName}\n\nThis would open the startup editing interface.`);
  
  console.log("Edit startup:", startupName);
}

/* REPLY TO MESSAGE */
function replyMessage(messageId) {
  const message = messagesData.find(m => m.id === messageId);
  if (message) {
    alert(`📧 Replying to: ${message.sender}\n\nThis would open a reply interface.`);
    console.log("Reply to message:", message);
  }
}

/* VIEW ALL MESSAGES */
function viewAllMessages(event) {
  if (event) event.preventDefault();
  
  const modal = document.getElementById("messagesModal");
  const messagesContainer = document.getElementById("allMessages");
  
  messagesContainer.innerHTML = messagesData.map(msg => `
    <div class="message-item">
      <div class="message-avatar">${msg.avatar}</div>
      <div class="message-content">
        <h4>${msg.sender}</h4>
        <p>${msg.message}</p>
        <span class="message-time">${msg.time}</span>
      </div>
      <div class="status-dot"></div>
    </div>
  `).join("");
  
  modal.classList.add("active");
}

function closeMessagesModal() {
  const modal = document.getElementById("messagesModal");
  modal.classList.remove("active");
}

/* VIEW ALL INVESTORS */
function viewInvestors(event) {
  if (event) event.preventDefault();
  
  const modal = document.getElementById("investorsModal");
  const investorsContainer = document.getElementById("allInvestors");
  
  investorsContainer.innerHTML = investorsData.map(investor => `
    <div class="investor-item">
      <div class="investor-avatar">${investor.avatar}</div>
      <div class="investor-content">
        <h4>${investor.name}</h4>
        <p>${investor.title}</p>
        <span class="connections">${investor.connections}</span>
      </div>
      <div class="status-dot"></div>
    </div>
  `).join("");
  
  modal.classList.add("active");
}

function closeInvestorsModal() {
  const modal = document.getElementById("investorsModal");
  modal.classList.remove("active");
}

/* CLOSE MODALS ON OUTSIDE CLICK */
window.addEventListener("click", function(event) {
  const profileModal = document.getElementById("profileModal");
  const startupModal = document.getElementById("startupModal");
  const messagesModal = document.getElementById("messagesModal");
  const investorsModal = document.getElementById("investorsModal");
  
  if (event.target === profileModal) {
    closeProfileModal();
  }
  if (event.target === startupModal) {
    closeStartupModal();
  }
  if (event.target === messagesModal) {
    closeMessagesModal();
  }
  if (event.target === investorsModal) {
    closeInvestorsModal();
  }
});

/* KEYBOARD ESCAPE TO CLOSE MODALS */
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    closeProfileModal();
    closeStartupModal();
    closeMessagesModal();
    closeInvestorsModal();
  }
});

/* SMOOTH SCROLL FOR LINKS */
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    if (!this.onclick) {
      e.preventDefault();
    }
  });
});

/* LOG PAGE LOAD */
console.log("Student Dashboard loaded successfully");
console.log("User:", userData);
console.log("Startups:", startupsData);
console.log("Messages:", messagesData);
console.log("Investors:", investorsData);

/**
 * ===== RENDER SUBMITTED IDEAS =====
 */
function renderStudentIdeas() {
    const list = document.getElementById('studenthome-ideas-list');
    
    if (!list) return;
    
    let sharedIdeas = JSON.parse(localStorage.getItem('student_shared_ideas'));
    
    // Add 2 sample projects if none exist
    if (!sharedIdeas || sharedIdeas.length === 0) {
        sharedIdeas = [
            {
                title: "KisanDrone",
                description: "Autonomous drone system for precision agriculture, crop scouting, and targeted pesticide spraying.",
                category: "Sustainability",
                funds: 2500000,
                stage: "Prototype",
                status: "Pending",
                submittedAt: new Date(Date.now() - 86400000 * 2).toISOString()
            },
            {
                title: "UPI PayPulse",
                description: "Voice-based UPI payment system for visually impaired and elderly users using regional Indian languages.",
                category: "Fintech",
                funds: 1500000,
                stage: "Idea",
                status: "Approved",
                submittedAt: new Date(Date.now() - 86400000 * 5).toISOString()
            }
        ];
        localStorage.setItem('student_shared_ideas', JSON.stringify(sharedIdeas));
    }
    
    if (sharedIdeas.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #888; padding: 20px;">No ideas submitted yet.</p>';
        return;
    }
    
    list.innerHTML = '';
    
    sharedIdeas.forEach(idea => {
        const dateObj = new Date(idea.submittedAt || Date.now());
        const formattedDate = dateObj.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        let statusBadge = '';
        if (idea.status === 'Approved') {
            statusBadge = '<span style="background: #e6f9e6; color: #2e8b57; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">Approved</span>';
        } else {
            statusBadge = '<span style="background: #fff5e6; color: #ff6a00; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">Pending</span>';
        }

        const formattedFunds = idea.funds ? `₹${Number(idea.funds).toLocaleString('en-IN')}` : 'N/A';
        
        const ideaCard = document.createElement('div');
        ideaCard.className = 'investor-mini-item';
        ideaCard.style.cssText = 'display: flex; align-items: flex-start; gap: 15px; background: #fafafa; padding: 15px; border-radius: 12px; transition: transform 0.2s; border-left: 4px solid #ff6a00; cursor: pointer;';
        ideaCard.onmouseover = function() { this.style.transform = 'translateX(5px)'; };
        ideaCard.onmouseout = function() { this.style.transform = 'translateX(0)'; };
        
        ideaCard.innerHTML = `
            <div class="inv-details" style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                    <strong style="display: block; font-size: 1rem; color: #333;">${idea.title}</strong>
                    ${statusBadge}
                </div>
                <p style="font-size: 0.85rem; color: #666; margin: 5px 0 10px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${idea.description}</p>
                <div style="display: flex; gap: 15px; font-size: 0.8rem; color: #888;">
                    <span>📁 ${idea.category}</span>
                    <span>💰 ${formattedFunds}</span>
                    <span>📅 ${formattedDate}</span>
                </div>
            </div>
        `;
        list.appendChild(ideaCard);
    });
}
