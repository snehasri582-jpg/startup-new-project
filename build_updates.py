import os
import re

# 1. Read notifications.html
with open('notifications.html', 'r', encoding='utf-8') as f:
    notif_html = f.read()

# 2. Extract the <style> from notifications.css or just use the same link
# notifications.html links to <link rel="stylesheet" href="notifications.css">
# We will use the same CSS

# 3. Read investorhome.html to get the investor Navbar and Sidebar
with open('investorhome.html', 'r', encoding='utf-8') as f:
    inv_html = f.read()

navbar_match = re.search(r'(<header class="navbar">.*?</header>)', inv_html, re.DOTALL)
sidebar_match = re.search(r'(<aside class="dashboard-modal".*?</aside>)', inv_html, re.DOTALL)

navbar = navbar_match.group(1) if navbar_match else ""
sidebar = sidebar_match.group(1) if sidebar_match else ""

# Ensure Updates & Documents is active in the sidebar, and Student Network is NOT active
sidebar = sidebar.replace('class="menu-item active"', 'class="menu-item"')
sidebar = sidebar.replace(
    '<a href="contact3.html"',
    '<a href="investor-updates.html" class="menu-item active"><span class="icon">🔔</span><span class="label">Updates & Documents</span></a>\n      <a href="contact3.html"'
)

investor_updates_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Updates & Documents - Investor Dashboard</title>
  <link rel="stylesheet" href="studenthome.css">
  <link rel="stylesheet" href="notifications.css">
  <link rel="stylesheet" href="sidebar.css">
  <style>
    body {{ background: #faf8f6; padding-top: 64px; }}
  </style>
</head>
<body>
  {navbar}
  {sidebar}
  <div class="sidebar-backdrop" id="sidebarBackdrop" onclick="closeSidebar()"></div>

  <main class="page">
    <div style="padding: 40px 5%; margin-top: 20px;">
      <h1 style="font-weight: 600; color: #333; margin-bottom: 10px;">Updates & Documents</h1>
      <p style="color: #666; font-size: 16px;">Track student progress reports, scheduled meetings, and admin approvals.</p>
    </div>

    <section class="content">
      <div class="panel">
        <div class="panel-header">
          <h2>Your Alerts</h2>
        </div>
        <div id="notificationsList" class="list" aria-live="polite"></div>
      </div>
    </section>
  </main>

  <script src="sidebar.js"></script>
  <script src="investor-updates.js"></script>
  <script>
    function handleLogout() {{
      if (confirm("Are you sure you want to logout?")) {{
        window.location.href = "index.html";
      }}
    }}
  </script>
</body>
</html>
"""

# 4. Create investor-updates.js
investor_updates_js = """
const defaultInvestorNotifications = [
  { 
    id: 1, 
    title: "Project Verified & Approved for Investment", 
    body: `
      Admin has successfully verified the startup <strong>EcoCharge</strong>. The project is now open for investment and meetings.
      <p style="color: #ff6a00; font-size: 12px; font-weight: bold; margin-top: 8px; margin-bottom: 0;">Click to view Student Profile ▼</p>
    `,
    expandedBody: `
      <div style="margin-top: 15px; padding: 0; background: #fff; border-radius: 12px; border: 1px solid #ebd9cf; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; cursor: default;" onclick="event.stopPropagation()">
        <div style="padding: 16px; border-bottom: 1px solid #eee; background: #fafafa;">
          <h4 style="margin: 0 0 10px 0; color: #ff6a00; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Project Details</h4>
          <h3 style="margin: 0 0 4px 0; font-size: 18px; color: #1a1a1a;">EcoCharge 🌱</h3>
          <p style="margin: 0 0 12px 0; font-size: 13px; color: #6b6b6b;">AI-powered optimization for electric vehicle charging stations.</p>
        </div>
        <div style="padding: 16px;">
          <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 12px;">
             <div style="font-size: 40px; width: 60px; height: 60px; background: #f6efe9; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid #ebd9cf;">🎓</div>
             <div>
               <h4 style="margin: 0; font-size: 16px; color: #1a1a1a;">Amit Mehra</h4>
               <p style="margin: 0; font-size: 13px; color: #6b6b6b; font-weight: 500;">Boston University</p>
               <div style="margin-top: 4px; font-size: 12px; color: #32b768; font-weight: bold;">✓ Verified Student</div>
             </div>
          </div>
          <div style="display: flex; gap: 10px;">
             <button style="flex: 1; background: linear-gradient(135deg, #ff6a00, #ff8c00); color: #fff; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px;" onclick="window.location.href='chat2.html'">💬 Message Amit</button>
          </div>
        </div>
      </div>
    `,
    time: "2 hours ago", 
    type: "Approvals", 
    read: false,
    expanded: false
  },
  { 
    id: 2, 
    title: "Weekly Progress Report Shared", 
    body: `
      <strong>Neha Patel</strong> has shared a new Weekly Progress Report for their project <strong>Smart City IoT</strong>.
      <br><br>
      <div style="background: #fafafa; padding: 10px; border-radius: 8px; font-size: 13px; color: #333;">
        📄 <a href="#" style="color: #1877f2; text-decoration: none; font-weight: 500;">Week_3_Metrics_Update.pdf</a>
      </div>
    `,
    time: "5 hours ago", 
    type: "Documents", 
    read: false,
    expanded: false
  },
  { 
    id: 3, 
    title: "Meeting Scheduled", 
    body: `
      <div style="background: #fff; padding: 16px; border-radius: 12px; border: 1px solid #ebd9cf; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-top: 10px;">
         <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 12px;">
            <span style="background: #e6f6ee; color: #1e7041; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;">UPCOMING</span>
            <div style="color: #6b6b6b; font-size: 13px; font-weight: 500;">📅 April 5, 2026 | ⏰ 11:00 AM</div>
         </div>
         <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #1a1a1a;">Pitch Discussion - HealthNest</h3>
         <div style="background: #fafafa; padding: 10px; border-radius: 8px; font-size: 13px; color: #333; margin-bottom: 16px;">
            <div style="margin-bottom: 4px;">🎓 <strong>Student:</strong> Priya Nair (Anna University)</div>
         </div>
         <button onclick="event.stopPropagation(); window.open('https://meet.google.com/abc-defg-hij', '_blank')" style="display: inline-block; background: #32b768; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">Join Meet</button>
      </div>
    `, 
    time: "1 day ago", 
    type: "Schedule", 
    read: true,
    expanded: false
  }
];

let investorNotifData = JSON.parse(localStorage.getItem('investor_notifications')) || defaultInvestorNotifications;

function saveNotifications() {
  localStorage.setItem('investor_notifications', JSON.stringify(investorNotifData));
}

function renderNotifications() {
  const list = document.getElementById('notificationsList');
  if (!list) return;

  if (investorNotifData.length === 0) {
    list.innerHTML = `<div class="empty-state">No new updates or documents.</div>`;
    return;
  }

  list.innerHTML = investorNotifData.map(notif => {
    let icon = "🔔";
    if (notif.type === "Approvals") icon = "✅";
    if (notif.type === "Documents") icon = "📄";
    if (notif.type === "Schedule") icon = "📅";

    return `
      <div class="notif-card ${notif.read ? '' : 'unread'}" onclick="toggleExpand(${notif.id})">
        <div class="notif-icon">${icon}</div>
        <div class="notif-content">
          <div class="notif-header">
            <h3>${notif.title}</h3>
            <span class="time">${notif.time}</span>
          </div>
          <div class="notif-body">${notif.body}</div>
          ${notif.expanded && notif.expandedBody ? `<div class="notif-expanded">${notif.expandedBody}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function toggleExpand(id) {
  const notif = investorNotifData.find(n => n.id === id);
  if (notif) {
    if (!notif.read) notif.read = true;
    if (notif.expandedBody) notif.expanded = !notif.expanded;
    saveNotifications();
    renderNotifications();
  }
}

window.addEventListener('load', renderNotifications);
"""

with open('investor-updates.html', 'w', encoding='utf-8') as f:
    f.write(investor_updates_html)

with open('investor-updates.js', 'w', encoding='utf-8') as f:
    f.write(investor_updates_js)

# 5. Update existing investor sidebars to include Updates & Documents
investor_files = [
    'investorhome.html', 'view.html', 'chat2.html', 'myinvest.html', 
    'contact3.html', 'shortlist.html', 'students.html'
]

for file in investor_files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if 'href="investor-updates.html"' not in content:
            new_link = '\n      <a href="investor-updates.html" class="menu-item"><span class="icon">🔔</span><span class="label">Updates & Documents</span></a>'
            content = re.sub(
                r'(<a href="contact3.html".*?>)', 
                rf'{new_link}\n      \1', 
                content
            )
            with open(file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Added Updates & Documents to {file}")

# Update profile-view.html
if os.path.exists('profile-view.html'):
    with open('profile-view.html', 'r', encoding='utf-8') as f:
        content = f.read()
    if 'href="investor-updates.html"' not in content:
        new_link = '        <a href="investor-updates.html" class="menu-item"><span class="icon">🔔</span><span class="label">Updates & Documents</span></a>\n'
        content = re.sub(
            r'(<a href="contact3.html".*?>)', 
            rf'{new_link}\1', 
            content
        )
        with open('profile-view.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Added Updates & Documents to profile-view.html")

print("Done")
