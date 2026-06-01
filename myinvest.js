// ==================== LOGOUT ==================== //
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

// ==================== DATA ==================== //
const activeProjects = [
  {
    id: 1, title: "KisanDrone", category: "Sustainability",
    description: "Autonomous drone system for precision agriculture, crop scouting, and targeted pesticide spraying.",
    funding: "₹25,00,000", investments: 14, comments: 23, postedDaysAgo: 1, trending: true,
    progress: 75,
    student: { name: "Aarav Sharma", university: "IIT Bombay" }
  },
  {
    id: 2, title: "UPI PayPulse", category: "Fintech",
    description: "Voice-based UPI payment system for visually impaired and elderly users using regional Indian languages.",
    funding: "₹15,00,000", investments: 21, comments: 45, postedDaysAgo: 2, trending: true,
    progress: 40,
    student: { name: "Sneha Reddy", university: "NIT Warangal" }
  },
  {
    id: 3, title: "Swasthya Kiosk", category: "Health",
    description: "Low-cost telemedicine kiosks to be installed in remote Indian villages for instant doctor consultations.",
    funding: "₹50,00,000", investments: 8, comments: 12, postedDaysAgo: 3, trending: false,
    progress: 90,
    student: { name: "Rohan Patel", university: "BITS Pilani" }
  },
  {
    id: 4, title: "EcoWeave", category: "Sustainability",
    description: "Biodegradable packaging material made from banana plant waste and agricultural stubble.",
    funding: "₹35,00,000", investments: 12, comments: 19, postedDaysAgo: 4, trending: false,
    progress: 60,
    student: { name: "Priya Singh", university: "IIT Delhi" }
  }
];

const previousProjects = [
  {
    id: 5, title: "VidyaConnect", category: "EdTech",
    description: "Peer-to-peer tutoring platform connecting college students with vernacular medium school students.",
    funding: "₹10,00,000", investments: 5, comments: 8, postedDaysAgo: 5, trending: false,
    progress: 100,
    student: { name: "Arjun Verma", university: "VIT Vellore" }
  },
  {
    id: 6, title: "SafeRide EV", category: "Tech",
    description: "Retrofit kits to convert existing petrol scooters into smart, affordable electric scooters.",
    funding: "₹40,00,000", investments: 32, comments: 55, postedDaysAgo: 1, trending: true,
    progress: 100,
    student: { name: "Karthik Iyer", university: "IIT Madras" }
  },
  {
    id: 7, title: "Neer Purifier", category: "Sustainability",
    description: "Gravity-based, non-electric water purifier utilizing nano-clay technology for heavy metal removal.",
    funding: "₹18,00,000", investments: 9, comments: 14, postedDaysAgo: 6, trending: false,
    progress: 100,
    student: { name: "Meera Das", university: "IISc Bangalore" }
  }
];

let currentFilter = "active";

// ==================== HELPERS ==================== //
function parseFunding(str) {
  const n = parseInt(str.replace(/[^0-9]/g, ''));
  return isNaN(n) ? 0 : n;
}

function formatINR(amount) {
  if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
  if (amount >= 100000)   return '₹' + (amount / 100000).toFixed(2) + ' L';
  return '₹' + amount.toLocaleString('en-IN');
}

// ==================== RENDER ==================== //
function renderProjects(list) {
  const container = document.getElementById("projectsList");
  if (!container) return;
  if (!list || list.length === 0) {
    container.innerHTML = '<p style="text-align:center;padding:40px;color:#999;grid-column:1/-1;">No projects found</p>';
    return;
  }
  container.innerHTML = list.map(createProjectCard).join('');
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

    <div class="card-creator" style="cursor:pointer;transition:transform 0.2s;"
         onclick="openProjectDetails('${dataAttr}')"
         onmouseover="this.style.transform='translateX(5px)'"
         onmouseout="this.style.transform='translateX(0)'">
      <div class="creator-avatar" style="overflow:hidden;padding:0;border:none;background:transparent;">
        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.student.name)}&background=ff6a00&color=fff&size=150"
             alt="${p.student.name}"
             style="width:100%;height:100%;border-radius:50%;object-fit:cover;">
      </div>
      <div class="creator-info">
        <div class="creator-name" style="color:#ff6a00;font-weight:700;">
          ${p.student.name}
          <span style="font-size:11px;font-weight:normal;color:#888;">(Click to view details)</span>
        </div>
        <div class="creator-university">🎓 ${p.student.university}</div>
      </div>
    </div>

    <p class="card-description">${p.description}</p>

    <div class="progress-section">
      <div class="progress-label">
        <span>Project Progress</span>
        <span>${p.progress}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${p.progress}%"></div>
      </div>
    </div>

    <div class="card-funding">Invested: ${p.funding}</div>

    <div class="card-meta">
      <div class="meta-item"><span class="meta-label">💰</span><span class="meta-value">${p.investments}</span></div>
      <div class="meta-item"><span class="meta-label">💬</span><span class="meta-value">${p.comments}</span></div>
      <div class="meta-item"><span class="meta-label">📅</span><span class="meta-label">Posted ${p.postedDaysAgo} ${p.postedDaysAgo === 1 ? 'day' : 'days'} ago</span></div>
    </div>

    <div class="card-actions">
      <button class="action-btn btn-secondary" onclick="openProjectDetails('${dataAttr}')">View Details</button>
      <button class="action-btn btn-primary" onclick="viewUpdates(${p.id})">View Updates</button>
    </div>
  </div>`;
}

// ==================== PROJECT DETAILS ==================== //
function openProjectDetails(encodedData) {
  try {
    const p = JSON.parse(decodeURIComponent(encodedData));
    localStorage.setItem('shareidea_selected', JSON.stringify({ project: p, student: p.student }));
  } catch (e) {}
  window.location.href = 'shareidea-details.html';
}

// ==================== STATS ==================== //
function updateStats() {
  let totalSum = 0;
  activeProjects.forEach(p => totalSum += parseFunding(p.funding));
  previousProjects.forEach(p => totalSum += parseFunding(p.funding));

  const el1 = document.getElementById('statTotalInvested');
  const el2 = document.getElementById('statActiveProjects');
  const el3 = document.getElementById('statCompletedProjects');

  if (el1) el1.textContent = formatINR(totalSum);
  if (el2) el2.textContent = activeProjects.length;
  if (el3) el3.textContent = previousProjects.length;
}

// ==================== FILTER BY CARD ==================== //
function filterByCard(type) {
  // Remove active ring from both cards
  ['cardActiveProjects','cardCompletedProjects'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('card-active');
  });

  // Add active ring to clicked card
  const cardId = type === 'previous' ? 'cardCompletedProjects' : 'cardActiveProjects';
  const clickedCard = document.getElementById(cardId);
  if (clickedCard) clickedCard.classList.add('card-active');

  // Sync tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  if (type === 'previous') {
    currentFilter = 'previous';
    const tab = document.getElementById('tabPrevious');
    if (tab) tab.classList.add('active');
    renderProjects(previousProjects);
  } else {
    currentFilter = 'active';
    const tab = document.getElementById('tabActive');
    if (tab) tab.classList.add('active');
    renderProjects(activeProjects);
  }
}

// ==================== TABS ==================== //
function showProjects(type) {
  currentFilter = type;

  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  const tabId = type === 'active' ? 'tabActive' : 'tabPrevious';
  const tab = document.getElementById(tabId);
  if (tab) tab.classList.add('active');

  // Sync stat card highlight
  ['cardTotalInvested','cardActiveProjects','cardCompletedProjects'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('card-active');
  });
  const syncCardId = type === 'active' ? 'cardActiveProjects' : 'cardCompletedProjects';
  const syncCard = document.getElementById(syncCardId);
  if (syncCard) syncCard.classList.add('card-active');

  const data = type === "active" ? activeProjects : previousProjects;
  renderProjects(data);
}

// ==================== SORT ==================== //
document.addEventListener('DOMContentLoaded', () => {
  const sortEl = document.getElementById("sortFilter");
  if (sortEl) {
    sortEl.addEventListener("change", (e) => {
      const sortValue = e.target.value;
      const data = currentFilter === "active" ? activeProjects : previousProjects;
      let sorted = [...data];
      if (sortValue === "progress") {
        sorted.sort((a, b) => b.progress - a.progress);
      } else if (sortValue === "amount") {
        sorted.sort((a, b) => parseFunding(b.funding) - parseFunding(a.funding));
      } else {
        sorted.sort((a, b) => a.id - b.id);
      }
      renderProjects(sorted);
    });
  }

  // ==================== SEARCH ==================== //
  const searchEl = document.getElementById("searchInput");
  if (searchEl) {
    searchEl.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();
      const data = currentFilter === "active" ? activeProjects : previousProjects;
      const filtered = data.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.student.name.toLowerCase().includes(term)
      );
      renderProjects(filtered);
    });
  }

  // ==================== INIT ==================== //
  renderProjects(activeProjects);
  updateStats();
  // Default highlight: Active Projects card
  const defaultCard = document.getElementById('cardActiveProjects');
  if (defaultCard) defaultCard.classList.add('card-active');
});

// ==================== VIEW UPDATES ==================== //
function viewUpdates(projectId) {
  const project = [...activeProjects, ...previousProjects].find(p => p.id === projectId);
  if (!project) return;

  const weekMap = { 1:'week4', 2:'week3', 3:'week2', 4:'week1', 5:'week5', 6:'week5', 7:'week5' };
  const selectedWeekId = weekMap[projectId] || 'week5';

  try {
    localStorage.setItem('investment_selected_project', JSON.stringify(project));
    localStorage.setItem('investment_selected_week_id', selectedWeekId);
  } catch (e) {}

  window.location.href = `report.html?id=${encodeURIComponent(selectedWeekId)}`;
}
