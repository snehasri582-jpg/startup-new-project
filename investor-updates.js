const defaultInvestorNotifications = [
  { 
    id: 1, 
    title: "Project Verified & Approved for Investment", 
    summary: "Admin has successfully verified the startup EcoCharge. The project is now open for investment.",
    body: "The admin team has successfully completed the vetting process for the student project <strong>EcoCharge</strong>. They have verified the prototype milestones, university credentials, and proof-of-concept. This startup is now officially open for angel investment, equity pledges, and student-investor collaborations.",
    student: { name: "Amit Mehra", university: "BITS Pilani" },
    project: { name: "EcoCharge 🌱", tagline: "AI-powered optimization for electric vehicle charging stations." },
    time: "2 hours ago", 
    type: "Approvals", 
    read: false
  },
  { 
    id: 2, 
    title: "Weekly Progress Report Shared", 
    summary: "Neha Patel has shared a new Weekly Progress Report for their project Smart City IoT.",
    body: "A new progress report has been submitted by Neha Patel tracking the status of <strong>Smart City IoT</strong>. The report details the hardware deployment milestones, sensor network latency graphs, and firmware updates completed during Week 3.",
    student: { name: "Neha Patel", university: "IIT Delhi" },
    file: "Week_3_Metrics_Update.pdf",
    time: "5 hours ago", 
    type: "Documents", 
    read: false
  },
  { 
    id: 3, 
    title: "Meeting Scheduled: Pitch Discussion", 
    summary: "Upcoming meeting with Priya Nair regarding HealthNest scheduled on April 5, 2026.",
    body: "A video pitch consultation session has been scheduled between you and the student founder Priya Nair. The purpose of this meeting is to walk through the Business Model Canvas, financial projections, and custom funding requirement for their HealthNest remote health-kiosk system.",
    student: { name: "Priya Nair", university: "Anna University" },
    time: "1 day ago", 
    meetingTime: "📅 April 5, 2026 | ⏰ 11:00 AM",
    meetLink: "https://meet.google.com/abc-defg-hij",
    type: "Schedule", 
    read: true
  }
];

let investorNotifData = JSON.parse(localStorage.getItem('investor_notifications')) || defaultInvestorNotifications;
function saveNotifications() {
  localStorage.setItem('investor_notifications', JSON.stringify(investorNotifData));
}

// ==================== RENDERING ==================== //
function renderNotifications() {
  const container = document.getElementById('updatesContainer');
  if (!container) return;

  if (investorNotifData.length === 0) {
    container.innerHTML = `<p style="text-align: center; padding: 40px; color: #999; grid-column: 1/-1;">No updates found.</p>`;
    return;
  }

  container.innerHTML = investorNotifData.map(notif => {
    let icon = "🔔";
    let tagClass = "approvals";
    if (notif.type === "Approvals") { icon = "✅"; tagClass = "approvals"; }
    if (notif.type === "Documents") { icon = "📄"; tagClass = "documents"; }
    if (notif.type === "Schedule") { icon = "📅"; tagClass = "schedule"; }

    return `
      <div class="update-card ${notif.read ? '' : 'unread'}" onclick="openDetails(${notif.id})">
        <div class="card-top">
          <span class="notif-tag ${tagClass}">${notif.type}</span>
          <span class="card-time">${notif.time}</span>
        </div>
        <div class="card-middle">
          <h3>${icon} ${notif.title}</h3>
          <p>${notif.summary}</p>
        </div>
        <div class="card-bottom-action">
          <span>👁️ Click to view total details</span>
        </div>
      </div>
    `;
  }).join('');
}

// ==================== MODAL ACTIONS ==================== //
function openDetails(id) {
  const notif = investorNotifData.find(n => n.id === id);
  if (!notif) return;

  // Mark as read
  if (!notif.read) {
    notif.read = true;
    saveNotifications();
    renderNotifications();
  }

  // Populate Modal Fields
  const modal = document.getElementById('detailsModal');
  const mTitle = document.getElementById('modalTitle');
  const mTag = document.getElementById('modalTag');
  const mTime = document.getElementById('modalTime');
  const mBody = document.getElementById('modalBody');
  const mActions = document.getElementById('modalActions');

  const mMeetingSection = document.getElementById('modalMeetingSection');
  const mDocSection = document.getElementById('modalDocSection');

  if (!modal) return;

  mTitle.textContent = notif.title;
  mTime.textContent = notif.time;

  // Tag styling
  mTag.textContent = notif.type;
  mTag.className = "notif-tag " + (
    notif.type === "Approvals" ? "approvals" :
    notif.type === "Documents" ? "documents" : "schedule"
  );

  // Setup main body content
  let bodyContent = notif.body;
  if (notif.student) {
    bodyContent += `
      <div style="margin-top: 15px; padding: 12px; background: #fafafa; border-radius: 8px; border: 1px solid #ebd9cf;">
        <h4 style="margin:0 0 6px 0; color:#ff6a00; font-size:11px; text-transform:uppercase;">Student Founder</h4>
        <div style="font-weight:700; color:#333; font-size:14px;">🎓 ${notif.student.name}</div>
        <div style="color:#666; font-size:12px;">University: ${notif.student.university}</div>
      </div>
    `;
  }
  mBody.innerHTML = bodyContent;

  // Setup specific details based on type
  if (notif.type === "Schedule" && notif.meetingTime) {
    mMeetingSection.style.display = "block";
    document.getElementById('modalMeetingDetails').innerHTML = `
      <div style="font-weight: 700; color:#2e7d32; font-size:13.5px; margin-bottom:8px;">${notif.meetingTime}</div>
      <div style="font-size:12px; color:#555;">Consultation will happen via Google Meet. Please click below to join.</div>
    `;
    mDocSection.style.display = "none";

    // Action button
    mActions.innerHTML = `
      <button class="modal-btn secondary" onclick="closeDetailsModal()">Close</button>
      <button class="modal-btn primary" onclick="window.open('${notif.meetLink}', '_blank')">📹 Join Google Meet</button>
    `;
  } 
  else if (notif.type === "Documents" && notif.file) {
    mDocSection.style.display = "block";
    mMeetingSection.style.display = "none";
    document.getElementById('modalDocDetails').innerHTML = `
      <div style="background: #eef2f7; padding: 10px; border-radius: 8px; font-size:13px; font-weight:600; color:#0d47a1; display:flex; align-items:center; gap:8px;">
        📄 <span>${notif.file}</span>
      </div>
    `;

    mActions.innerHTML = `
      <button class="modal-btn secondary" onclick="closeDetailsModal()">Close</button>
      <button class="modal-btn primary" onclick="alert('Downloading file: ${notif.file}...')">📥 Download Report</button>
    `;
  } 
  else if (notif.type === "Approvals" && notif.project) {
    mDocSection.style.display = "none";
    mMeetingSection.style.display = "none";
    
    mActions.innerHTML = `
      <button class="modal-btn secondary" onclick="closeDetailsModal()">Close</button>
      <button class="modal-btn primary" onclick="window.location.href='chat2.html'">💬 Chat with ${notif.student.name}</button>
    `;
  } 
  else {
    mDocSection.style.display = "none";
    mMeetingSection.style.display = "none";
    mActions.innerHTML = `<button class="modal-btn secondary" onclick="closeDetailsModal()">Close</button>`;
  }

  // Open modal
  modal.classList.add('active');
}

function closeDetailsModal() {
  const modal = document.getElementById('detailsModal');
  if (modal) modal.classList.remove('active');
}

// ==================== INIT ==================== //
window.addEventListener('DOMContentLoaded', () => {
  renderNotifications();
});
