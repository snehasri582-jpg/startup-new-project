// Student Share Idea Details
// Reads idea+student details from localStorage and renders a detailed view.

function handleLogout() {
  if (typeof window !== 'undefined') {
    if (confirm('Are you sure you want to logout?')) {
      window.location.href = 'index.html';
    }
  }
}

function safeText(v) {
  return (v === undefined || v === null) ? '' : String(v);
}

function renderDetails(data) {
  const mount = document.getElementById('detailsMount');
  if (!mount) return;

  if (!data || !data.project) {
    mount.innerHTML = '<p style="text-align:center; color:#999; padding:40px;">No idea selected.</p>';
    return;
  }

  const student = data.student || {};
  const project = data.project || {};

  const title = safeText(project.title || project.name || 'Idea Details');
  const description = safeText(project.description || project.problem || '');
  const funding = safeText(project.funding || project.requestedFunding || '');
  const category = safeText(project.category || '');
  const keyFeatures = safeText(project.keyFeatures || '');
  const solution = safeText(project.solution || '');
  const estimatedTimeline = safeText(project.estimatedTimeline || '');
  const projectStage = safeText(project.projectStage || '');
  const purposeOfFunds = safeText(project.purposeOfFunds || '');
  const spendingCategory = safeText(project.spendingCategory || '');
  const demoLink = safeText(project.demoLink || '');

  mount.innerHTML = `
    <div class="project-card" style="grid-template-columns: 1fr;">
      <div class="card-left" style="grid-column: 1 / -1;">
        
        <!-- PROJECT HEADER -->
        <div class="card-header" style="margin-bottom: 20px;">
          <h2 class="card-title" style="font-size: 2rem; color: #ff6a00;">${title}</h2>
          ${project.trending ? '<span class="trending-badge">🔥 Trending</span>' : ''}
        </div>

        <!-- PROJECT DETAILS -->
        <div style="background: #fff8f3; padding: 20px; border-radius: 8px; border: 1px solid #ffe4cc; margin-bottom: 24px;">
            <h3 style="margin: 0 0 15px; color:#ff6a00; border-bottom: 1px solid #ffccaa; padding-bottom: 8px;">Project Details</h3>
            
            <p style="color:#444; margin-bottom: 12px;"><strong>Description:</strong> ${description}</p>
            <p style="color:#444; margin-bottom: 12px;"><strong>Category:</strong> ${category}</p>
            
            ${keyFeatures ? `<p style="color:#444; margin-bottom: 12px;"><strong>Key Features:</strong> ${keyFeatures}</p>` : ''}
            ${solution ? `<p style="color:#444; margin-bottom: 12px;"><strong>Solution / Problem Solved:</strong> ${solution}</p>` : ''}
            ${estimatedTimeline ? `<p style="color:#444; margin-bottom: 12px;"><strong>Estimated Timeline:</strong> ${estimatedTimeline}</p>` : ''}
            ${projectStage ? `<p style="color:#444; margin-bottom: 12px;"><strong>Project Stage:</strong> <span style="background: #ff6a00; color: white; padding: 3px 8px; border-radius: 4px; font-size: 0.85rem;">${projectStage}</span></p>` : ''}
            
            <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <h4 style="margin: 0 0 10px; color: #333;">Funding & Financials</h4>
                <p style="color:#444; margin-bottom: 8px;"><strong>Funding Required:</strong> ${funding}</p>
                ${purposeOfFunds ? `<p style="color:#444; margin-bottom: 8px;"><strong>Purpose of Funds:</strong> ${purposeOfFunds}</p>` : ''}
                ${spendingCategory ? `<p style="color:#444; margin-bottom: 8px;"><strong>Spending Category:</strong> ${spendingCategory}</p>` : ''}
            </div>

            ${demoLink ? `
              <div style="margin-top: 15px;">
                <strong>Prototype Demo:</strong> <a href="${demoLink}" target="_blank" style="color: #ff6a00; text-decoration: underline;">${demoLink}</a>
              </div>
            ` : ''}
        </div>

        <!-- STUDENT PROFILE -->
        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #eee; margin-bottom: 24px;">
            <h3 style="margin: 0 0 15px; color:#333; border-bottom: 1px solid #eee; padding-bottom: 8px;">Student Profile</h3>
            
            <div class="card-creator" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
              <div class="creator-avatar" style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; background: transparent; padding: 0; border: none;">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(safeText(student.name))}&background=ff6a00&color=fff&size=150" alt="${safeText(student.name)}" style="width: 100%; height: 100%; object-fit: cover;">
              </div>
              <div class="creator-info">
                <div class="creator-name" style="font-size: 1.2rem; font-weight: 700; color: #333;">${safeText(student.name)}</div>
                <div class="creator-university" style="color: #666;">🎓 ${safeText(student.university)}</div>
              </div>
            </div>
            
            <p style="color:#555; margin-bottom: 8px;"><strong>Age:</strong> ${student.age ? safeText(student.age) + ' years old' : 'N/A'}</p>
            <p style="color:#555; margin-bottom: 8px;"><strong>Bio:</strong> ${safeText(student.bio)}</p>
            <p style="color:#555; margin-bottom: 8px;"><strong>Skills:</strong> ${safeText(student.skills)}</p>
        </div>

        <!-- ACTIONS -->
        <div class="card-actions" style="margin-top: 18px; border-top: 1px solid #eee; padding-top: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="action-btn btn-primary" style="background: #f1f5f9; color: #333; border: 1px solid #cbd5e1;" onclick="history.back()">← Back</button>
          
          <div style="flex-grow: 1;"></div>
          
          <button class="action-btn" style="background:#25D366;color:#fff; border: none; font-weight: bold;" onclick="window.location.href='chat2.html'"><i class="fas fa-comment"></i> 💬 Chat with ${safeText(student.name)}</button>
          <button class="action-btn" style="background:#ff6a00;color:#fff; border: none; font-weight: bold;" onclick="window.location.href='schedule.html'">📅 Schedule Meeting</button>
        </div>
      </div>
    </div>
  `;
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    const raw = localStorage.getItem('shareidea_selected');
    const data = raw ? JSON.parse(raw) : null;
    renderDetails(data);
  } catch (e) {
    const mount = document.getElementById('detailsMount');
    if (mount) mount.innerHTML = '<p style="text-align:center; color:#999; padding:40px;">No idea selected.</p>';
  }
});

