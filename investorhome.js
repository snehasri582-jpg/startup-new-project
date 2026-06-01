// ==================== LOGOUT FUNCTION ==================== //
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

// ==================== NAVIGATION ==================== //
function toggleMenu() {
  const navMenu = document.querySelector('.nav-menu');
  if (navMenu) navMenu.classList.toggle('active');
}

// ==================== STAT BUTTONS ==================== //
function viewIdeas() {
  window.location.href = 'view.html';
}

function viewPortfolio() {
  window.location.href = 'myinvest.html';
}

function viewSchedule() {
  showModal(
    'Upcoming Meetings',
    'You have 5 upcoming meetings scheduled:\n\n1. KisanDrone - May 31, 2026 at 10:00 AM\n2. UPI PayPulse - June 2, 2026 at 2:00 PM\n3. Swasthya Kiosk - June 4, 2026 at 3:30 PM\n4. EcoWeave - June 6, 2026 at 11:00 AM\n5. SafeRide EV - June 8, 2026 at 4:00 PM'
  );
}

// ==================== PROJECT DATA & RENDERING ==================== //
const projects = [
  {
    id: 1, title: "KisanDrone", category: "Sustainability",
    description: "Autonomous drone system for precision agriculture, crop scouting, and targeted pesticide spraying.",
    keyFeatures: "AI crop analysis, 4K camera, automated flight paths, payload capacity of 10kg.",
    solution: "Reduces pesticide waste by 40% and increases yield for Indian farmers.",
    estimatedTimeline: "9 months to beta test", projectStage: "Prototype Stage",
    purposeOfFunds: "Procuring hardware components and field testing in rural Maharashtra.",
    spendingCategory: "Research & Development", demoLink: "https://kisandrone.in/demo",
    funding: "₹25,00,000", investments: 14, comments: 23, postedDaysAgo: 1, trending: true,
    student: { name: "Aarav Sharma", age: 22, university: "IIT Bombay", bio: "AgriTech Innovator", skills: "Robotics, AI, Python" }
  },
  {
    id: 2, title: "UPI PayPulse", category: "Fintech",
    description: "Voice-based UPI payment system for visually impaired and elderly users using regional Indian languages.",
    keyFeatures: "Voice biometric authentication, support for 12 Indian languages, offline mode.",
    solution: "Bridges the digital divide by making digital payments accessible to non-tech savvy users.",
    estimatedTimeline: "6 months", projectStage: "Idea Stage",
    purposeOfFunds: "Hiring NLP engineers and UI/UX design.",
    spendingCategory: "Software Development", demoLink: "",
    funding: "₹15,00,000", investments: 21, comments: 45, postedDaysAgo: 2, trending: true,
    student: { name: "Yamini", age: 21, university: "NIT Warangal", bio: "Fintech enthusiast", skills: "NLP, Voice AI, Node.js" }
  },
  {
    id: 3, title: "Swasthya Kiosk", category: "Health",
    description: "Low-cost telemedicine kiosks to be installed in remote Indian villages for instant doctor consultations.",
    keyFeatures: "Built-in vitals scanner (BP, Sugar), Video call integration, solar-powered.",
    solution: "Provides primary healthcare access to villages with no resident doctors.",
    estimatedTimeline: "12 months to deploy 10 kiosks", projectStage: "Prototype Stage",
    purposeOfFunds: "Manufacturing kiosks and setting up a doctor network.",
    spendingCategory: "Infrastructure", demoLink: "https://swasthya-kiosk.in/demo",
    funding: "₹50,00,000", investments: 8, comments: 12, postedDaysAgo: 3, trending: false,
    student: { name: "Sudharshan", age: 23, university: "BITS Pilani", bio: "HealthTech Maker", skills: "IoT, Healthcare Admin" }
  },
  {
    id: 4, title: "EcoWeave", category: "Sustainability",
    description: "Biodegradable packaging material made from banana plant waste and agricultural stubble.",
    keyFeatures: "100% compostable, water-resistant, cheaper than standard bioplastics.",
    solution: "Reduces agricultural stubble burning and plastic pollution simultaneously.",
    estimatedTimeline: "1 year for mass production", projectStage: "Prototype Stage",
    purposeOfFunds: "Setting up a pilot manufacturing plant in Punjab.",
    spendingCategory: "Manufacturing", demoLink: "",
    funding: "₹35,00,000", investments: 12, comments: 19, postedDaysAgo: 4, trending: false,
    student: { name: "Archana", age: 24, university: "IIT Delhi", bio: "Material Scientist", skills: "Chemical Engg, Sustainability" }
  },
  {
    id: 5, title: "VidyaConnect", category: "EdTech",
    description: "Peer-to-peer tutoring platform connecting college students with vernacular medium school students.",
    keyFeatures: "Vernacular language matching, progress tracking, gamified learning.",
    solution: "Provides high-quality personalized tutoring to students who cannot afford premium EdTech.",
    estimatedTimeline: "3 months to MVP", projectStage: "Idea Stage",
    purposeOfFunds: "App development and marketing in tier-3 cities.",
    spendingCategory: "Marketing & Dev", demoLink: "",
    funding: "₹10,00,000", investments: 5, comments: 8, postedDaysAgo: 5, trending: false,
    student: { name: "Arjun Verma", age: 20, university: "VIT Vellore", bio: "EdTech Developer", skills: "React Native, Firebase" }
  },
  {
    id: 6, title: "SafeRide EV", category: "Tech",
    description: "Retrofit kits to convert existing petrol scooters into smart, affordable electric scooters.",
    keyFeatures: "Plug-and-play battery, IoT GPS tracking, 80km range.",
    solution: "Makes EV transition affordable for delivery executives and daily commuters.",
    estimatedTimeline: "6 months for ARAI approval", projectStage: "Prototype Stage",
    purposeOfFunds: "Certification and safety testing.",
    spendingCategory: "Legal & Compliance", demoLink: "https://saferide.in/demo",
    funding: "₹40,00,000", investments: 32, comments: 55, postedDaysAgo: 1, trending: true,
    student: { name: "Karthik Iyer", age: 22, university: "IIT Madras", bio: "EV Enthusiast", skills: "Automobile Engg, Embedded C" }
  }
];

function renderProjects() {
  const ideaList = document.getElementById("ideaList");
  if (!ideaList) return;
  ideaList.innerHTML = "";
  projects.forEach(p => {
    try {
      ideaList.innerHTML += createProjectCard(p);
    } catch(err) {
      console.error("Error creating card for project: " + p.title, err);
    }
  });
}

function createProjectCard(p) {
  const trendingBadge = p.trending ? `<span class="trending-badge">🔥 Trending</span>` : "";
  const dataAttr = encodeURIComponent(JSON.stringify(p));
  
  return `
  <div class="project-card">
    <div class="card-header">
      <h2 class="card-title">${p.title}</h2>
      ${trendingBadge}
    </div>
    
    <div class="card-creator" style="cursor: pointer; transition: transform 0.2s;" 
         onclick="openProjectDetails('${dataAttr}')" 
         onmouseover="this.style.transform='translateX(5px)'" 
         onmouseout="this.style.transform='translateX(0)'">
      <div class="creator-avatar" style="overflow: hidden; padding: 0; border: none; background: transparent;">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.student.name)}&background=ff6a00&color=fff&size=150" 
             alt="${p.student.name}" 
             style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
      </div>
      <div class="creator-info">
        <div class="creator-name" style="color: #ff6a00; font-weight: 700;">
          ${p.student.name} <span style="font-size: 11px; font-weight: normal; color: #888;">(Click to view details)</span>
        </div>
        <div class="creator-university">🎓 ${p.student.university}</div>
      </div>
    </div>
    
    <p class="card-description">${p.description}</p>
    
    <div class="card-funding">Funding Requested: ${p.funding}</div>
    
    <div class="card-meta">
      <div class="meta-item">
        <span class="meta-label">💰</span>
        <span class="meta-value">${p.investments}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">💬</span>
        <span class="meta-value">${p.comments}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">📅</span>
        <span class="meta-label">Posted ${p.postedDaysAgo} ${p.postedDaysAgo === 1 ? 'day' : 'days'} ago</span>
      </div>
    </div>
    
    <div class="card-actions">
      <button class="action-btn btn-primary" onclick="openProjectDetails('${dataAttr}')">View Details</button>
    </div>
  </div>`;
}

function openProjectDetails(encodedData) {
  try {
    const p = JSON.parse(decodeURIComponent(encodedData));
    localStorage.setItem('shareidea_selected', JSON.stringify({
      project: p,
      student: p.student
    }));
  } catch (e) {
    console.error("Error setting project details", e);
  }
  window.location.href = 'shareidea-details.html';
}

// ==================== MODAL FUNCTIONS ==================== //
function showModal(title, message) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  if (modal && modalTitle && modalMessage) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'block';
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.style.display = 'none';
}

function confirmAction() {
  alert('Action confirmed! Processing your request...');
  closeModal();
}

window.onclick = function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// ==================== UPDATE STATS ==================== //
function updateStats() {
  const parseFunding = (fundingStr) => {
    const num = parseInt(fundingStr.replace(/[^0-9]/g, ''));
    return isNaN(num) ? 0 : num;
  };
  
  const formatINR = (amount) => {
    if (amount >= 10000000) {
      return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    } else if (amount >= 100000) {
      return '₹' + (amount / 100000).toFixed(2) + ' L';
    }
    return '₹' + amount.toLocaleString('en-IN');
  };

  let totalSum = 0;
  projects.forEach(p => totalSum += parseFunding(p.funding));

  const totalInvestedEl = document.getElementById('statHomeInvested');
  const meetingsEl = document.getElementById('statHomeMeetings');
  const ideasEl = document.getElementById('statHomeIdeas');

  if (totalInvestedEl) totalInvestedEl.textContent = formatINR(totalSum * 0.5); 
  if (meetingsEl) meetingsEl.textContent = "5"; 
  if (ideasEl) ideasEl.textContent = projects.length + 9; 
}

// ==================== INITIALIZATION ==================== //
function initDashboard() {
  // Load real investor name dynamically from localStorage
  const storedProfiles = localStorage.getItem('collab_profiles');
  if (storedProfiles) {
    try {
      const profiles = JSON.parse(storedProfiles);
      const activeProfile = profiles['aman-gupta']; // Default active investor is Aman Gupta
      if (activeProfile) {
        const welcomeEl = document.querySelector('.welcome-text');
        if (welcomeEl) {
          welcomeEl.textContent = `Welcome, ${activeProfile.name}!`;
        }
      }
    } catch(e) {
      console.error("Error setting welcome name", e);
    }
  }

  // Render recommended project cards
  renderProjects();
  
  // Calculate dynamic stats
  updateStats();
}

document.addEventListener('DOMContentLoaded', initDashboard);

console.log('InvestorHome page loaded successfully');
