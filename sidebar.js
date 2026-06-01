// ==================== GLOBAL PROFILE STORE ==================== //
const DEFAULT_PROFILES = {
  'admin': {
    id: 'admin',
    name: 'Platform Admin',
    role: 'System Administrator',
    type: 'Administrator',
    company: 'Startup Collab Corp',
    dob: '1988-11-23',
    about: 'System Administrator for the Startup Collab platform. Responsible for platform operations, student verification, project approvals, and investor relations.',
    investment: '🔧 Controls & Operations',
    interests: ['Management', 'Vetting', 'Platform Security'],
    experience: '5+ years in system administration and platform operations.',
    portfolio: '100+',
    success: '95%',
    funding: 'N/A',
    email: 'admin@startupcollab.in',
    phone: '+91 98765 12345',
    linkedin: 'https://linkedin.com',
    image: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png'
  },
    'student-pro': {
    id: 'student-pro',
    name: 'Karthik',
    role: 'Student Pro',
    type: 'Aspiring Entrepreneur',
    company: 'BITS Pilani',
    dob: '2003-04-12',
    about: 'Computer Science student at BITS Pilani. Developing AI-powered education solutions and passionate about scaling social impact projects.',
    investment: '🎯 Seeking Seed Funding',
    interests: ['AI', 'EdTech', 'FinTech', 'SaaS'],
    experience: '3+ years of full-stack development experience. Lead developer for the TechInnovate platform.',
    portfolio: '2',
    success: '1',
    funding: '₹10L+',
    email: 'karthik@student.edu',
    phone: '+91 7032139423',
    linkedin: 'https://linkedin.com/in/karthik',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&fit=crop&q=80'
  },
  'aman-gupta': {
    id: 'aman-gupta',
    name: 'Aman Gupta',
    role: 'Co-founder & CMO',
    type: 'Strategic Investor',
    company: 'boAt Lifestyle',
    dob: '1982-03-04',
    about: 'Co-founder and CMO of boAt Lifestyle. Active angel investor and Shark on Shark Tank India. Backs consumer brands, hardware startups, and D2C products through the boAt ecosystem.',
    investment: '₹1.5 Cr - ₹8 Cr',
    interests: ['Consumer Brands', 'Hardware', 'D2C', 'Lifestyle'],
    experience: 'Scaled boAt from a startup to a ₹3,00,000 Cr lifestyle brand in 5 years. Backed 60+ startups in consumer electronics and lifestyle space.',
    portfolio: '25',
    success: '18',
    funding: '₹2,000 Cr',
    email: 'aman.gupta@boat-lifestyle.com',
    phone: '+91 98765 12345',
    linkedin: 'https://linkedin.com/in/aman-gupta-boat',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&fit=crop&q=80'
  },
  'kunal-shah': {
    id: 'kunal-shah',
    name: 'Kunal Shah',
    role: 'Founder',
    type: 'Angel Investor',
    company: 'CRED',
    dob: '1983-04-06',
    about: 'Founder of CRED and Freecharge. One of India\'s most active angel investors, backing consumer tech, fintech, Web3, and growth platforms across South and Southeast Asia.',
    investment: '₹50 L - ₹2.5 Cr',
    interests: ['Fintech', 'Consumer Internet', 'Web3', 'Deep Tech'],
    experience: 'Founded Freecharge (acquired by Snapdeal) and built CRED. Active mentor to 180+ founders. Known for his delta-4 theory of consumer behaviour.',
    portfolio: '15',
    success: '10',
    funding: '₹600 Cr',
    email: 'kunal.shah@cred.club',
    phone: '+91 99876 54321',
    linkedin: 'https://linkedin.com/in/kunal-shah',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&q=80'
  },
  'namita-thapar': {
    id: 'namita-thapar',
    name: 'Namita Thapar',
    role: 'Executive Director',
    type: 'Venture Capitalist',
    company: 'Emcure Pharmaceuticals',
    dob: '1977-03-21',
    about: 'Executive Director of Emcure Pharmaceuticals and Shark on Shark Tank India. Focused on early-stage investments in HealthTech, BioTech and D2C brands with Pan-India distribution.',
    investment: '₹4 Cr - ₹20 Cr',
    interests: ['HealthTech', 'BioTech', 'D2C', 'Pharma'],
    experience: 'Led corporate venture arm of Emcure Pharmaceuticals. Backed 50+ health and wellness startups. Known for rigorous due diligence and strong mentorship.',
    portfolio: '20',
    success: '15',
    funding: '₹1,200 Cr',
    email: 'namita@emcure.com',
    phone: '+91 98765 00001',
    linkedin: 'https://linkedin.com/in/namita-thapar',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop&q=80'
  },
  'anupam-mittal': {
    id: 'anupam-mittal',
    name: 'Anupam Mittal',
    role: 'Founder & CEO',
    type: 'Angel Investor',
    company: 'People Group (Shaadi.com)',
    dob: '1971-12-23',
    about: 'Founder of People Group, Shaadi.com, Makaan.com. Active angel investor backing technology, consumer internet, and logistics brands across India.',
    investment: '₹1 Cr - ₹5 Cr',
    interests: ['Tech', 'AI', 'Internet Products', 'Logistics'],
    experience: 'Pioneered online matchmaking in India with Shaadi.com. Shark on Shark Tank India. Backed over 80+ companies including Ola, Interactive Avenues, and Druva.',
    portfolio: '35',
    success: '22',
    funding: '₹500 Cr',
    email: 'anupam.mittal@peoplegroup.com',
    phone: '+91 98765 22334',
    linkedin: 'https://linkedin.com/in/anupam-mittal',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&fit=crop&q=80'
  }
};

// ==================== INITIALIZE SIDEBAR & DATA ==================== //
function initializeSidebar() {
  const stored = localStorage.getItem('collab_profiles');
  if (!stored || !stored.includes('aman-gupta')) {
    localStorage.setItem('collab_profiles', JSON.stringify(DEFAULT_PROFILES));
  }
  
  const backdrop = document.getElementById("sidebarBackdrop");
  if (backdrop) {
    backdrop.addEventListener("click", closeSidebar);
  }

  // Detect Context and Role
  let activeUserId = 'student-pro';
  let role = 'student';
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const urlId = params.get('id');

  if (path.includes('admin') || urlId === 'admin') {
    activeUserId = 'admin';
    role = 'admin';
  } else if (
    path.includes('investorhome') || 
    path.includes('investor-updates') ||
    path.includes('myinvest') || 
    path.includes('view') || 
    path.includes('students.html') ||
    path.includes('updates') ||
    path.includes('contact3') ||
    path.includes('chat2') ||
    urlId === 'aman-gupta' ||
    urlId === 'kunal-shah' ||
    urlId === 'namita-thapar' ||
    urlId === 'anupam-mittal'
  ) {
    activeUserId = urlId || 'aman-gupta';
    role = 'investor';
  } else {
    activeUserId = urlId || 'student-pro';
    role = 'student';
  }

  // Get active profile details
  let profiles = DEFAULT_PROFILES;
  try {
    profiles = JSON.parse(localStorage.getItem('collab_profiles')) || DEFAULT_PROFILES;
  } catch (e) {}
  const activeProfile = profiles[activeUserId] || profiles['student-pro'];

  // Dynamically render sidebar profile DP, Name and small Edit Button
  const modalProfileEl = document.querySelector('.modal-profile');
  if (modalProfileEl && activeProfile) {
    const editUrl = `profile.html?id=${activeProfile.id}&edit=true`;
    const viewUrl = `profile.html?id=${activeProfile.id}`;

    modalProfileEl.innerHTML = `
      <a href="${viewUrl}" class="modal-avatar-link" title="View Profile">
        <div class="modal-avatar">
          <img src="${activeProfile.image}" alt="${activeProfile.name}">
        </div>
      </a>
      <h3><a href="${viewUrl}">${activeProfile.name}</a></h3>
      <p class="muted">${activeProfile.role}</p>
      <a href="${editUrl}" class="sidebar-profile-edit-btn">
        <span>✏️</span> Edit Profile
      </a>
    `;
  }

  // Dynamically render menu items to keep sequence identical and remove emojis on investor page
  const menuEl = document.querySelector('.modal-menu');
  if (menuEl) {
    if (role === 'investor') {
      const isHome = path.includes('investorhome.html');
      const isView = path.includes('view.html');
      const isNetwork = path.includes('students.html');
      const isMessage = path.includes('chat2.html');
      const isInvest = path.includes('myinvest.html');
      const isUpdates = path.includes('investor-updates.html');
      const isCare = path.includes('contact3.html');

      // Sequence: home, view ideas, network, message, my investment, updates, customer care
      menuEl.innerHTML = `
        <a href="investorhome.html" class="menu-item ${isHome ? 'active' : ''}"><span class="label">Home</span></a>
        <a href="view.html" class="menu-item ${isView ? 'active' : ''}"><span class="label">View Ideas</span></a>
        <a href="students.html" class="menu-item ${isNetwork ? 'active' : ''}"><span class="label">Network</span></a>
        <a href="chat2.html" class="menu-item ${isMessage ? 'active' : ''}"><span class="label">Message</span></a>
        <a href="myinvest.html" class="menu-item ${isInvest ? 'active' : ''}"><span class="label">My Investment</span></a>
        <a href="investor-updates.html" class="menu-item ${isUpdates ? 'active' : ''}"><span class="label">Updates</span></a>
        <a href="contact3.html" class="menu-item ${isCare ? 'active' : ''}"><span class="label">Customer Care</span></a>
      `;
    } else if (role === 'admin') {
      const isOverview = path.includes('admin.html');
      const isStudents = path.includes('admin-students.html') || path.includes('admin-student-details.html');
      const isIdeas = path.includes('admin-ideas.html') || path.includes('admin-idea-details.html');
      const isInvestors = path.includes('admin-investors.html') || path.includes('admin-investor-details.html');
      const isSchedule = path.includes('admin-schedule.html');
      const isMessages = path.includes('admin-messages.html');
      const isDocuments = path.includes('admin-documents.html');
      const isProfile = path.includes('profile.html') && urlId === 'admin';

      menuEl.innerHTML = `
        <a href="admin.html" class="menu-item ${isOverview ? 'active' : ''}"><span class="icon">📊</span><span class="label">Dashboard Overview</span></a>
        <a href="admin-students.html" class="menu-item ${isStudents ? 'active' : ''}"><span class="icon">🎓</span><span class="label">Students</span></a>
        <a href="admin-ideas.html" class="menu-item ${isIdeas ? 'active' : ''}"><span class="icon">💡</span><span class="label">Projects</span></a>
        <a href="admin-investors.html" class="menu-item ${isInvestors ? 'active' : ''}"><span class="icon">💰</span><span class="label">Investors</span></a>
        <a href="admin-schedule.html" class="menu-item ${isSchedule ? 'active' : ''}"><span class="icon">📈</span><span class="label">Applications</span></a>
        <a href="admin-messages.html" class="menu-item ${isMessages ? 'active' : ''}"><span class="icon">📨</span><span class="label">Messages</span></a>
        <a href="admin-documents.html" class="menu-item ${isDocuments ? 'active' : ''}"><span class="icon">📄</span><span class="label">Documents</span></a>
        <a href="profile.html?id=admin" class="menu-item ${isProfile ? 'active' : ''}"><span class="icon">👤</span><span class="label">Admin Profile</span></a>
      `;
    } else if (role === 'student') {
      const isHome = path.includes('studenthome.html');
      const isShareIdea = path.includes('shareidea.html');
      const isNetwork = path.includes('investors.html');
      const isMessage = path.includes('chat.html');
      const isSubmitReport = path.includes('tracking.html');
      const isUploadDocs = path.includes('notifications.html');
      const isCare = path.includes('contact2.html');

      menuEl.innerHTML = `
        <a href="studenthome.html" class="menu-item ${isHome ? 'active' : ''}"><span class="label">Home</span></a>
        <a href="shareidea.html" class="menu-item ${isShareIdea ? 'active' : ''}"><span class="label">Share Idea</span></a>
        <a href="investors.html" class="menu-item ${isNetwork ? 'active' : ''}"><span class="label">Network</span></a>
        <a href="chat.html" class="menu-item ${isMessage ? 'active' : ''}"><span class="label">Message</span></a>
        <a href="tracking.html" class="menu-item ${isSubmitReport ? 'active' : ''}"><span class="label">Submit Report</span></a>
        <a href="notifications.html" class="menu-item ${isUploadDocs ? 'active' : ''}"><span class="label">Upload Documents</span></a>
        <a href="contact2.html" class="menu-item ${isCare ? 'active' : ''}"><span class="label">Customer Care</span></a>
      `;
    }
  }

  // Dynamically set logo link depending on role
  const logoEl = document.querySelector('.logo');
  if (logoEl) {
    let dest = 'index.html';
    if (role === 'admin') {
      dest = 'admin.html';
    } else if (role === 'investor') {
      dest = 'investorhome.html';
    } else if (role === 'student') {
      dest = 'studenthome.html';
    }

    if (logoEl.tagName.toLowerCase() !== 'a') {
      const newLogo = document.createElement('a');
      newLogo.className = logoEl.className;
      newLogo.innerHTML = logoEl.innerHTML;
      newLogo.href = dest;
      newLogo.style.textDecoration = 'none';
      logoEl.parentNode.replaceChild(newLogo, logoEl);
    } else {
      logoEl.href = dest;
      logoEl.style.textDecoration = 'none';
    }
  }
}

// ==================== SIDEBAR TOGGLING ==================== //
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

function handleLogout() {
  if (confirm("Are you sure you want to log out?")) {
    window.location.href = 'login.html';
  }
}

window.addEventListener("DOMContentLoaded", initializeSidebar);
