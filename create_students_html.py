import os
import re

if os.path.exists('investors.html'):
    with open('investors.html', 'r', encoding='utf-8') as f:
        investors_content = f.read()

    style_match = re.search(r'<style>(.*?)</style>', investors_content, re.DOTALL)
    styles = style_match.group(1) if style_match else ''

    students_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Student Network - Startup Collab</title>
  <link rel="stylesheet" href="studenthome.css">
  <link rel="stylesheet" href="sidebar.css">
  <style>{styles}</style>
</head>
<body>
  <!-- NAVBAR -->
  <header class="navbar">
    <div class="navbar-left">
      <button id="sidebarToggle" class="sidebar-toggle" onclick="toggleSidebar()" aria-label="Open dashboard menu">☰</button>
      <a href="investorhome.html" class="logo">Startup<span>Collab</span></a>
    </div>
    <div class="navbar-right">
      <button class="logout-btn" onclick="handleLogout()">Logout</button>
    </div>
  </header>

  <!-- SIDEBAR (Modal Style) -->
  <aside class="dashboard-modal" id="dashboardSidebar" aria-hidden="true">
    <div class="modal-top">
      <button class="modal-close" onclick="closeSidebar()" aria-label="Close">×</button>
      <div class="modal-profile">
        <div class="modal-avatar">👤</div>
        <h3>Investor Pro</h3>
        <p class="muted">Angel Investor</p>
      </div>
    </div>

    <nav class="modal-menu">
      <a href="investorhome.html" class="menu-item"><span class="icon">🏠</span><span class="label">Home</span></a>
      <a href="view.html" class="menu-item"><span class="icon">💡</span><span class="label">View Ideas</span></a>
      <a href="chat2.html" class="menu-item"><span class="icon">💬</span><span class="label">Messages</span></a>
      <a href="myinvest.html" class="menu-item"><span class="icon">💼</span><span class="label">My Investments</span></a>
      <a href="contact3.html" class="menu-item"><span class="icon">☎️</span><span class="label">Customer Care</span></a>
      <a href="students.html" class="menu-item active"><span class="icon">🎓</span><span class="label">Student Network</span></a>
    </nav>

    <div class="modal-footer">
      <button class="logout-btn" onclick="handleLogout()">Logout</button>
      <div class="socials">
        <a href="#" class="s">f</a>
        <a href="#" class="s">𝕏</a>
        <a href="#" class="s">📷</a>
        <a href="#" class="s">in</a>
      </div>
    </div>
  </aside>
  <div class="sidebar-backdrop" id="sidebarBackdrop" onclick="closeSidebar()"></div>

  <!-- MAIN NETWORK PAGE -->
  <main class="network-container">
    <div class="network-header">
      <h1>Student Network</h1>
      <p>Explore profiles of aspiring student entrepreneurs from top colleges.</p>
    </div>

    <div class="investors-grid" id="studentsGrid">
      <!-- Generated dynamically -->
    </div>
  </main>

  <script src="admin-students-store.js"></script>
  <script src="sidebar.js"></script>
  <script>
    let currentUser = JSON.parse(localStorage.getItem('startupConnect.currentUser'));
    if (!currentUser || currentUser.role !== 'investor') {{
      currentUser = {{
        role: 'investor',
        id: 11,
        name: 'Investor Pro',
        firm: 'Global Ventures',
        avatar: '👤'
      }};
      localStorage.setItem('startupConnect.currentUser', JSON.stringify(currentUser));
    }}

    window.addEventListener('load', () => {{
      renderNetworkGrid();
    }});

    function getConnections() {{
      return JSON.parse(localStorage.getItem('startupConnect.connections')) || [];
    }}

    function navigateToProfile(event, studentId) {{
      if (event.target.closest('.card-btn')) return;
      window.location.href = `profile-view.html?type=student&id=${{studentId}}`;
    }}

    function handleCardConnect(event, studentId, studentName) {{
      event.stopPropagation();
      const connections = getConnections();
      const connectionId = `student_${{studentId}}_investor_${{currentUser.id}}`;
      
      const newConnection = {{
        id: connectionId,
        studentId: studentId,
        studentName: studentName,
        investorId: currentUser.id,
        investorName: currentUser.name,
        fromRole: currentUser.role,
        toRole: 'student',
        status: 'pending'
      }};
      
      connections.push(newConnection);
      localStorage.setItem('startupConnect.connections', JSON.stringify(connections));
      alert(`Connection request sent to ${{studentName}}!`);
      renderNetworkGrid();
    }}

    function handleCardMessage(event) {{
      event.stopPropagation();
      window.location.href = 'chat2.html';
    }}

    function renderNetworkGrid() {{
      const grid = document.getElementById('studentsGrid');
      if (!grid) return;

      const students = window.AdminStudentStore.getAll();
      const connections = getConnections();

      grid.innerHTML = students.map((std, idx) => {{
        // Find connection status
        const reqId = `student_${{std.id}}_investor_${{currentUser.id}}`;
        const conn = connections.find(c => c.id === reqId);
        
        let buttonHtml = '';
        if (!conn) {{
          buttonHtml = `<button onclick="handleCardConnect(event, ${{std.id}}, '${{std.name}}')" class="card-btn btn-connect">Connect</button>`;
        }} else if (conn.status === 'pending') {{
          buttonHtml = `<button class="card-btn btn-pending" disabled>Request Sent</button>`;
        }} else if (conn.status === 'accepted') {{
          buttonHtml = `<button onclick="handleCardMessage(event)" class="card-btn btn-message">Connected</button>`;
        }}

        let chatButtonHtml = `<button onclick="alert('You can only message this student after they approve your connection request.')" class="card-btn btn-chat-secondary" style="opacity: 0.5; cursor: not-allowed;">Chat</button>`;
        if (conn && conn.status === 'accepted') {{
          chatButtonHtml = `<button onclick="handleCardMessage(event)" class="card-btn btn-chat-secondary">Chat</button>`;
        }}

        return `
          <div class="investor-card" onclick="navigateToProfile(event, ${{std.id}})">
            <div class="card-banner"></div>
            <div class="card-avatar-wrapper" style="margin-top: -45px;">
              <img class="card-avatar" src="https://ui-avatars.com/api/?name=${{encodeURIComponent(std.name)}}&background=random&color=fff&size=150" alt="${{std.name}}">
            </div>
            <div class="card-body">
              <h3 class="card-name" title="${{std.name}}">${{std.name}}</h3>
              <p class="card-firm" title="${{std.university}}">${{std.university}}</p>
              <div class="card-tag" title="${{std.department}}">${{std.department}} - ${{std.year}}</div>
              <p class="card-bio">${{std.bio}}</p>
              <div class="card-actions-row">
                ${{buttonHtml}}
                ${{chatButtonHtml}}
              </div>
            </div>
          </div>
        `;
      }}).join('');
    }}

    function handleLogout() {{
      if (confirm("Are you sure you want to logout?")) {{
        window.location.href = "index.html";
      }}
    }}
  </script>
</body>
</html>"""

    with open('students.html', 'w', encoding='utf-8') as f:
        f.write(students_html)
    print("Created students.html")
