const settingsData = {
  notifyEmail: true,
  notifyAlerts: true,
  profileVisibility: true,
  publicIdeas: false,
  showQuickActions: false,
  enableDarkMode: false
};

function initSettings() {
  Object.keys(settingsData).forEach((key) => {
    const el = document.getElementById(key);
    if (el) el.checked = !!settingsData[key];
  });

  applyDashboardPreferences();

  Object.keys(settingsData).forEach((key) => {
    const el = document.getElementById(key);
    if (!el) return;
    el.addEventListener('change', () => {
      settingsData[key] = el.checked;
      if (key === 'enableDarkMode') {
        document.body.style.filter = settingsData.enableDarkMode ? 'invert(1) hue-rotate(180deg)' : '';
      }
    });
  });
}

function saveSettings() {
  alert('✅ Your website settings have been saved.');
  console.log('Saved settings:', settingsData);
}

function applyDashboardPreferences() {
  // This page is standalone; we just update dark mode preview.
  document.body.style.filter = settingsData.enableDarkMode ? 'invert(1) hue-rotate(180deg)' : '';
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', initSettings);

