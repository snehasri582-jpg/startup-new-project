// ================= PROFILE DATA SYNC WITH LOCALSTORAGE =================
let profileData = {};

let currentProfileId = 'student-pro';

// ================= LOAD PROFILE =================
document.addEventListener('DOMContentLoaded', () => {
  // Sync profiles from localStorage if available
  const storedProfiles = localStorage.getItem('collab_profiles');
  if (storedProfiles) {
    try {
      profileData = JSON.parse(storedProfiles);
    } catch (e) {
      console.error("Error parsing stored profiles", e);
    }
  }

  const params = new URLSearchParams(window.location.search);
  // Default to student-pro, but check if we are on investor pages or if it's set
  currentProfileId = params.get('id') || 'student-pro';
  
  const profile = profileData[currentProfileId];
  
  if (profile) {
    loadProfile(profile);
  } else {
    currentProfileId = 'student-pro';
    if (profileData['student-pro']) {
      loadProfile(profileData['student-pro']);
    }
  }

  // Rewrite sidebar menu dynamically if user is Admin
  if (currentProfileId === 'admin') {
    const menuEl = document.querySelector('.modal-menu');
    if (menuEl) {
      menuEl.innerHTML = `
        <a href="admin.html" class="menu-item"><span class="icon">📊</span><span class="label">Dashboard Overview</span></a>
        <a href="admin-students.html" class="menu-item"><span class="icon">🎓</span><span class="label">Students</span></a>
        <a href="admin-ideas.html" class="menu-item"><span class="icon">💡</span><span class="label">Projects</span></a>
        <a href="admin-investors.html" class="menu-item"><span class="icon">💰</span><span class="label">Investors</span></a>
        <a href="admin-schedule.html" class="menu-item"><span class="icon">📈</span><span class="label">Applications</span></a>
        <a href="admin-messages.html" class="menu-item"><span class="icon">📨</span><span class="label">Messages</span></a>
        <a href="admin-documents.html" class="menu-item"><span class="icon">📄</span><span class="label">Documents</span></a>
        <a href="profile.html?id=admin" class="menu-item active"><span class="icon">👤</span><span class="label">Admin Profile</span></a>
      `;
    }
    const modalAvatar = document.querySelector('.modal-avatar');
    const modalName = document.querySelector('.modal-profile h3');
    const modalMuted = document.querySelector('.modal-profile .muted');
    if (modalAvatar) modalAvatar.textContent = 'A';
    if (modalName) modalName.textContent = 'Platform Admin';
    if (modalMuted) modalMuted.textContent = 'System Administrator';
  }

  // Automatically trigger edit modal if parameter edit=true is present
  if (params.get('edit') === 'true') {
    setTimeout(editProfile, 200);
  }

  // Setup edit form submission
  const editForm = document.getElementById('editProfileForm');
  if (editForm) {
    editForm.addEventListener('submit', handleSaveProfile);
  }
});

// ================= DISPLAY PROFILE =================
function loadProfile(profile) {
  // Set avatar as image
  const avatarEl = document.getElementById('profileAvatar');
  if (avatarEl) {
    avatarEl.innerHTML = `<img src="${profile.image}" alt="${profile.name}" style="width: 100%; height: 100%; border-radius: 8px; object-fit: cover;">`;
  }
  
  // Set basic info
  if (document.getElementById('profileName')) document.getElementById('profileName').textContent = profile.name;
  if (document.getElementById('profileRole')) document.getElementById('profileRole').textContent = profile.role;
  if (document.getElementById('profileType')) document.getElementById('profileType').textContent = profile.type;
  
  // Set about sections
  if (document.getElementById('profileAbout')) document.getElementById('profileAbout').textContent = profile.about;
  if (document.getElementById('profileInvestment')) {
    document.getElementById('profileInvestment').textContent = `💰 ${profile.investment}`;
  }
  if (document.getElementById('profileExperience')) document.getElementById('profileExperience').textContent = profile.experience;
  
  // Set interests
  const interestsEl = document.getElementById('profileInterests');
  if (interestsEl && profile.interests) {
    interestsEl.innerHTML = profile.interests.map(interest => `<span class="tag">${interest}</span>`).join('');
  }
  
  // Set stats
  if (document.getElementById('statPortfolio')) document.getElementById('statPortfolio').textContent = profile.portfolio || '0';
  if (document.getElementById('statSuccess')) document.getElementById('statSuccess').textContent = profile.success || '0';
  if (document.getElementById('statFunding')) document.getElementById('statFunding').textContent = profile.funding || '₹0';
  
  // Set contact & personal info
  if (document.getElementById('profileCompany')) document.getElementById('profileCompany').textContent = profile.company || 'N/A';
  if (document.getElementById('profileDob')) document.getElementById('profileDob').textContent = profile.dob || 'YYYY-MM-DD';
  if (document.getElementById('profileEmail')) document.getElementById('profileEmail').textContent = profile.email;
  if (document.getElementById('profilePhone')) document.getElementById('profilePhone').textContent = profile.phone;
  if (document.getElementById('profileLinkedin')) {
    document.getElementById('profileLinkedin').innerHTML = `<a href="${profile.linkedin}" target="_blank">View Profile</a>`;
  }

  // Toggle sections for Admin
  const isAdmin = (currentProfileId === 'admin');
  const investmentSection = document.getElementById('investmentSection');
  if (investmentSection) investmentSection.style.display = isAdmin ? 'none' : '';

  const interestsSection = document.getElementById('interestsSection');
  if (interestsSection) interestsSection.style.display = isAdmin ? 'none' : '';

  const experienceSection = document.getElementById('experienceSection');
  if (experienceSection) experienceSection.style.display = isAdmin ? 'none' : '';

  const statsSection = document.getElementById('statsSection');
  if (statsSection) statsSection.style.display = isAdmin ? 'none' : '';

  const actionsSection = document.getElementById('actionsSection');
  if (actionsSection) actionsSection.style.display = isAdmin ? 'none' : '';
}

// ================= EDIT PROFILE =================
function editProfile() {
  const profile = profileData[currentProfileId];
  if (!profile) return;

  const modal = document.getElementById('editProfileModal');
  if (!modal) return;

  // Populate form fields with current data
  if (document.getElementById('editName')) document.getElementById('editName').value = profile.name;
  if (document.getElementById('editRole')) document.getElementById('editRole').value = profile.role;
  if (document.getElementById('editType')) document.getElementById('editType').value = profile.type;
  if (document.getElementById('editAbout')) document.getElementById('editAbout').value = profile.about;
  if (document.getElementById('editEmail')) document.getElementById('editEmail').value = profile.email;
  if (document.getElementById('editPhone')) document.getElementById('editPhone').value = profile.phone;
  if (document.getElementById('editLinkedin')) document.getElementById('editLinkedin').value = profile.linkedin;
  if (document.getElementById('editCompany')) document.getElementById('editCompany').value = profile.company || '';
  if (document.getElementById('editDob')) document.getElementById('editDob').value = profile.dob || '';
  if (document.getElementById('editInvestment')) document.getElementById('editInvestment').value = profile.investment;
  if (document.getElementById('editExperience')) document.getElementById('editExperience').value = profile.experience;
  if (document.getElementById('editInterests')) document.getElementById('editInterests').value = (profile.interests || []).join(', ');
  if (document.getElementById('editPortfolio')) document.getElementById('editPortfolio').value = profile.portfolio || '';
  if (document.getElementById('editSuccess')) document.getElementById('editSuccess').value = profile.success || '';
  if (document.getElementById('editFunding')) document.getElementById('editFunding').value = profile.funding || '';

  // Toggle edit form groups and required status for Admin
  const isAdmin = (currentProfileId === 'admin');
  const adminGroups = [
    { id: 'editInvestmentGroup', inputId: 'editInvestment' },
    { id: 'editInterestsGroup', inputId: 'editInterests' },
    { id: 'editPortfolioGroup', inputId: 'editPortfolio' },
    { id: 'editSuccessGroup', inputId: 'editSuccess' },
    { id: 'editFundingGroup', inputId: 'editFunding' },
    { id: 'editExperienceGroup', inputId: 'editExperience' }
  ];
  
  adminGroups.forEach(group => {
    const el = document.getElementById(group.id);
    const inputEl = document.getElementById(group.inputId);
    if (el) {
      el.style.display = isAdmin ? 'none' : '';
    }
    if (inputEl) {
      if (isAdmin) {
        inputEl.removeAttribute('required');
      } else {
        inputEl.setAttribute('required', '');
      }
    }
  });

  modal.classList.add('active');
}

function closeProfileModal() {
  const modal = document.getElementById('editProfileModal');
  if (modal) modal.classList.remove('active');
}

function handleSaveProfile(e) {
  e.preventDefault();
  const profile = profileData[currentProfileId];
  if (!profile) return;

  // Update data object with new form values
  if (document.getElementById('editName')) profile.name = document.getElementById('editName').value;
  if (document.getElementById('editRole')) profile.role = document.getElementById('editRole').value;
  if (document.getElementById('editType')) profile.type = document.getElementById('editType').value;
  if (document.getElementById('editAbout')) profile.about = document.getElementById('editAbout').value;
  if (document.getElementById('editEmail')) profile.email = document.getElementById('editEmail').value;
  if (document.getElementById('editPhone')) profile.phone = document.getElementById('editPhone').value;
  if (document.getElementById('editLinkedin')) profile.linkedin = document.getElementById('editLinkedin').value;
  if (document.getElementById('editCompany')) profile.company = document.getElementById('editCompany').value;
  if (document.getElementById('editDob')) profile.dob = document.getElementById('editDob').value;
  
  if (currentProfileId !== 'admin') {
    if (document.getElementById('editInvestment')) profile.investment = document.getElementById('editInvestment').value;
    if (document.getElementById('editExperience')) profile.experience = document.getElementById('editExperience').value;
    if (document.getElementById('editInterests')) {
      profile.interests = document.getElementById('editInterests').value.split(',').map(i => i.trim());
    }
    if (document.getElementById('editPortfolio')) profile.portfolio = document.getElementById('editPortfolio').value;
    if (document.getElementById('editSuccess')) profile.success = document.getElementById('editSuccess').value;
    if (document.getElementById('editFunding')) profile.funding = document.getElementById('editFunding').value;
  }

  // Save updated profileData object back to localStorage
  localStorage.setItem('collab_profiles', JSON.stringify(profileData));

  // Refresh the UI with updated profile
  loadProfile(profile);
  
  closeProfileModal();
  alert('✅ Profile updated successfully!');
}

// ================= ACTION BUTTONS =================
function connectProfile() {
  alert('Connection request sent! You will be notified when they accept.');
}

function messageProfile() {
  const name = document.getElementById('profileName').textContent;
  alert(`Opening chat with ${name}...`);
  window.location.href = 'chat2.html';
}

// ================= NAVIGATION BACK =================
function goBackProfile() {
  const params = new URLSearchParams(window.location.search);
  const profileId = params.get('id') || 'student-pro';
  
  if (profileId === 'admin') {
    window.location.href = 'admin.html';
  } else if (profileId === 'student-pro') {
    window.location.href = 'studenthome.html';
  } else {
    // It's an investor
    window.location.href = 'investorhome.html';
  }
}

// ================= LOGOUT =================
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

console.log('Profile Page Loaded');
