const defaultNotifications = [
  { 
    id: 1, 
    title: "Meeting Scheduled & Approved", 
    body: `
      <div style="background: #fff; padding: 16px; border-radius: 12px; border: 1px solid #ebd9cf; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-top: 10px;">
         <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 12px;">
            <span style="background: #e6f6ee; color: #1e7041; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 700;">UPCOMING</span>
            <div style="color: #6b6b6b; font-size: 13px; font-weight: 500;">📅 March 15, 2024 | ⏰ 10:00 AM</div>
         </div>
         <h3 style="font-size: 16px; margin: 0 0 8px 0; color: #1a1a1a;">Initial Pitch Discussion</h3>
         <p style="color: #6b6b6b; font-size: 14px; margin-bottom: 12px;">Discussing product roadmap and funding needs for TechInnovate.</p>
         <div style="background: #fafafa; padding: 10px; border-radius: 8px; font-size: 13px; color: #333; margin-bottom: 16px;">
            <div style="margin-bottom: 4px;">💰 <strong>Investor:</strong> Sarah Chen (Sequoia Capital)</div>
         </div>
         <button onclick="event.stopPropagation(); window.open('https://meet.google.com/abc-defg-hij', '_blank')" style="display: inline-block; background: #32b768; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 13px; cursor: pointer;">Join Meet</button>
      </div>
    `, 
    time: "Just now", 
    type: "Schedule", 
    read: false,
    expanded: false
  },
  { 
    id: 2, 
    title: "Project Approved Successfully", 
    body: `
      Congratulations! Your project <strong>EcoCharge</strong> has been successfully approved by the admin. The investor <strong>Rajesh Kapoor (Nexus Ventures)</strong> wants to connect with you to discuss the next steps.
      <p style="color: #ff6a00; font-size: 12px; font-weight: bold; margin-top: 8px; margin-bottom: 0;">Click to view Investor Profile ▼</p>
    `,
    expandedBody: `
      <div style="margin-top: 15px; padding: 0; background: #fff; border-radius: 12px; border: 1px solid #ebd9cf; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; cursor: default;" onclick="event.stopPropagation()">
        
        <!-- PROJECT SECTION -->
        <div style="padding: 16px; border-bottom: 1px solid #eee; background: #fafafa;">
          <h4 style="margin: 0 0 10px 0; color: #ff6a00; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Project Details</h4>
          <h3 style="margin: 0 0 4px 0; font-size: 18px; color: #1a1a1a;">EcoCharge 🌱</h3>
          <p style="margin: 0 0 12px 0; font-size: 13px; color: #6b6b6b;">AI-powered optimization for electric vehicle charging stations. Enhances grid efficiency and lowers user costs.</p>
          <div style="display: flex; gap: 12px; font-size: 12px; flex-wrap: wrap;">
             <span style="background: #e6f6ee; color: #1e7041; padding: 4px 8px; border-radius: 6px;">Status: Approved</span>
             <span style="background: #f0f0f0; color: #333; padding: 4px 8px; border-radius: 6px;">Funding Ask: ₹12.5 L</span>
             <span style="background: #f0f0f0; color: #333; padding: 4px 8px; border-radius: 6px;">Equity Offered: 10%</span>
          </div>
        </div>

        <!-- INVESTOR SECTION -->
        <div style="padding: 16px;">
          <h4 style="margin: 0 0 12px 0; color: #ff6a00; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Matched Investor Profile</h4>
          
          <div style="display: flex; gap: 15px; align-items: center; margin-bottom: 12px;">
             <div style="font-size: 40px; width: 60px; height: 60px; background: #f6efe9; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1px solid #ebd9cf;">👨‍💼</div>
             <div>
               <h4 style="margin: 0; font-size: 16px; color: #1a1a1a;">Rajesh Kapoor</h4>
               <p style="margin: 0; font-size: 13px; color: #6b6b6b; font-weight: 500;">Partner at Nexus Ventures</p>
               <div style="margin-top: 4px; font-size: 12px; color: #32b768; font-weight: bold;">✓ Verified Investor</div>
             </div>
          </div>
          
          <p style="font-size: 13px; color: #444; margin-bottom: 12px; line-height: 1.5;">Rajesh focuses on early-stage investments in sustainable technology, clean energy, and mobility startups. Known for scaling 5+ tech unicorns in India and providing deep strategic mentorship to founders.</p>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 12px; color: #333; margin-bottom: 16px; background: #f9f9f9; padding: 12px; border-radius: 8px; border: 1px solid #eee;">
             <div>💰 <strong>Investment Range:</strong><br>$50K - $500K</div>
             <div>📍 <strong>Location:</strong><br>Mumbai, India</div>
             <div>🏢 <strong>Portfolio:</strong><br>15 Active Startups</div>
             <div>🤝 <strong>Mentorship:</strong><br>Available Weekly</div>
          </div>
          
          <div style="display: flex; gap: 10px;">
             <button style="flex: 1; background: linear-gradient(135deg, #ff6a00, #ff8c00); color: #fff; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px;" onclick="window.location.href='chat2.html'">💬 Message Rajesh</button>
             <button style="flex: 1; background: #fff; color: #ff6a00; border: 1px solid #ff6a00; padding: 10px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px;" onclick="window.location.href='admin-investor-details.html'">📄 View Full Profile</button>
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
    id: 3, 
    title: "Message received", 
    body: "You have a new message from Rajesh Kapoor.", 
    time: "5 hours ago", 
    type: "Messages", 
    read: true,
    expanded: false
  }
];

let notificationsData = JSON.parse(localStorage.getItem('student_notifications')) || defaultNotifications;

function saveNotifications() {
  localStorage.setItem('student_notifications', JSON.stringify(notificationsData));
}

function renderNotifications() {
  const list = document.getElementById('notificationsList');
  if (!list) return;

  if (!notificationsData.length) {
    list.innerHTML = `<div class="note"><div class="note-left"><div class="bell">🔔</div><div><div class="note-title">No notifications</div><div class="note-body">You're all caught up.</div></div></div></div>`;
    return;
  }

  list.innerHTML = notificationsData
    .slice()
    .sort((a,b)=>Number(b.read)-Number(a.read) || b.id - a.id)
    .map(n => `
      <div class="note ${n.read ? '' : 'unread'}" role="button" tabindex="0" onclick="markRead(${n.id})" onkeypress="handleKey(event, ${n.id})" style="${n.expanded ? 'border-color: #ff6a00;' : ''}">
        <div class="note-left" style="width: 100%;">
          <div class="bell">🔔</div>
          <div style="width: 100%;">
            <div class="note-title">${n.title}</div>
            <div class="note-body" style="margin-top: 8px;">
               ${n.body}
               ${n.expanded && n.expandedBody ? n.expandedBody : ''}
            </div>
          </div>
        </div>
        <div class="meta">
          <div class="tag">${n.type}</div>
          <div class="time">${n.time}</div>
        </div>
      </div>
    `).join('');
}

function handleKey(e, id) {
  if (e && e.key === 'Enter') markRead(id);
}

function markRead(id) {
  const n = notificationsData.find(x => x.id === id);
  if (!n) return;
  n.read = true;
  
  if (n.expandedBody) {
    n.expanded = !n.expanded;
  }
  
  saveNotifications();
  renderNotifications();
}

function markAllRead() {
  notificationsData.forEach(n => { n.read = true; n.expanded = false; });
  saveNotifications();
  renderNotifications();
}

function clearAll() {
  if (!confirm('Clear all notifications?')) return;
  notificationsData = [];
  saveNotifications();
  renderNotifications();
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  renderNotifications();
  renderUploadedDocs();

  // Handle file select
  const fileSelect = document.getElementById('studentFileSelect');
  const fileNameText = document.getElementById('studentFileName');
  if (fileSelect && fileNameText) {
    fileSelect.addEventListener('change', () => {
      const file = fileSelect.files[0];
      if (file) {
        fileNameText.textContent = `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
      } else {
        fileNameText.textContent = "Click to browse file";
      }
    });
  }

  // Handle form submission
  const uploadForm = document.getElementById('studentDocUploadForm');
  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const docTypeSelect = document.getElementById('docTypeSelect');
      const docType = docTypeSelect.value;
      const file = fileSelect.files[0];
      
      // Get comment (optional)
      const commentElem = document.getElementById('docComment');
      const comment = commentElem ? commentElem.value.trim() : '';

      if (!docType || !file) {
        alert("Please select both a document type and a file.");
        return;
      }

      let studentName = "Karthik";
      try {
        const profiles = JSON.parse(localStorage.getItem('collab_profiles'));
        if (profiles && profiles['student-pro'] && profiles['student-pro'].name) {
          studentName = profiles['student-pro'].name;
        }
      } catch(e) {}

      const newDoc = {
        id: Date.now(),
        name: studentName,
        role: "Student",
        project: "EcoCharge 🌱",
        docType: docType,
        fileName: file.name,
        date: new Date().toISOString().split('T')[0],
        status: "Pending",
        comment: comment // store optional comment
      };

      let docs = JSON.parse(localStorage.getItem('admin_documents')) || DEFAULT_DOCUMENTS;
      docs.unshift(newDoc);
      localStorage.setItem('admin_documents', JSON.stringify(docs));

      alert("✅ Document submitted successfully! It has been received in the Admin Documents Store.");
      
      // Reset form
      uploadForm.reset();
      fileNameText.textContent = "Click to browse file";
      
      renderUploadedDocs();
    });
  }
});

const DEFAULT_DOCUMENTS = [
    { id: 1, name: "Karthik", role: "Student", project: "EcoCharge 🌱", docType: "Weekly Progress PDF", fileName: "Week_3_Metrics_Update.pdf", date: "2026-05-30", status: "Approved" },
    { id: 2, name: "Yamini", role: "Student", project: "UPI PayPulse 📱", docType: "Pitch Deck Proposal", fileName: "UPI_PayPulse_PitchDeck.pdf", date: "2026-05-29", status: "Pending" },
    { id: 3, name: "Namita Thapar", role: "Investor", project: "Emcure Pharmaceuticals", docType: "Accreditation Proof", fileName: "Accreditation_Doc_Namita.pdf", date: "2026-05-28", status: "Approved" },
    { id: 4, name: "Kalyani", role: "Student", project: "EcoWeave 🍃", docType: "Weekly Progress PDF", fileName: "Week_1_Materials_Report.pdf", date: "2026-05-27", status: "Pending" },
    { id: 5, name: "Aman Gupta", role: "Investor", project: "boAt Lifestyle", docType: "KYC verification", fileName: "Aman_Gupta_KYC_Proof.pdf", date: "2026-05-26", status: "Approved" },
    { id: 6, name: "Sudharshan", role: "Student", project: "Swasthya Kiosk 🏥", docType: "Accredited Lab Report", fileName: "Kiosk_Vitals_Certification.pdf", date: "2026-05-25", status: "Rejected" }
];

function getStudentDocs() {
  const docs = JSON.parse(localStorage.getItem('admin_documents')) || DEFAULT_DOCUMENTS;
  // Get active profile name to filter, default to Karthik
  let studentName = "Karthik";
  try {
    const profiles = JSON.parse(localStorage.getItem('collab_profiles'));
    if (profiles && profiles['student-pro'] && profiles['student-pro'].name) {
      studentName = profiles['student-pro'].name;
    }
  } catch(e) {}
  return docs.filter(d => d.name === studentName);
}

function renderUploadedDocs() {
  const tbody = document.getElementById('studentDocsTableBody');
  if (!tbody) return;

  const studentDocs = getStudentDocs();
  if (studentDocs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 20px; color: #999;">No documents uploaded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = studentDocs.map(doc => {
    let badgeStyle = '';
    if (doc.status === 'Approved') {
      badgeStyle = 'background: #e6f6ee; color: #1e7041; padding: 4px 10px; border-radius: 20px; font-weight: bold; display: inline-block;';
    } else if (doc.status === 'Pending') {
      badgeStyle = 'background: #fff5e6; color: #b25e00; padding: 4px 10px; border-radius: 20px; font-weight: bold; display: inline-block;';
    } else {
      badgeStyle = 'background: #fde8e8; color: #9b1c1c; padding: 4px 10px; border-radius: 20px; font-weight: bold; display: inline-block;';
    }

    return `
      			<tr style="border-bottom: 1px solid #eee;">
				<td style="padding: 12px 8px;"><strong>${doc.docType}</strong></td>
				<td style="padding: 12px 8px; color: #ff6a00;"><span style="cursor: pointer;" onclick="alert('Downloading ${doc.fileName}')">📄 ${doc.fileName}</span></td>
				<td style="padding: 12px 8px;">${doc.date}</td>
				<td style="padding: 12px 8px;"><span style="${badgeStyle}">${doc.status}</span></td>
				<td style="padding: 12px 8px;">${doc.comment ? doc.comment : ''}</td>
				<td style="padding: 12px 8px; text-align: right;"><button onclick="deleteStudentDoc(${doc.id})" style="background: none; border: none; color: #9b1c1c; font-weight: 600; cursor: pointer;">Delete</button></td>
				</tr>
    `;
  }).join('');
}

function deleteStudentDoc(id) {
  if (confirm("Are you sure you want to delete this document submission?")) {
    let docs = JSON.parse(localStorage.getItem('admin_documents')) || DEFAULT_DOCUMENTS;
    docs = docs.filter(d => d.id !== id);
    localStorage.setItem('admin_documents', JSON.stringify(docs));
    renderUploadedDocs();
  }
}

