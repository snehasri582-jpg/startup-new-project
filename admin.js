 // ==================== DATA STORE (Simulated) ====================
const platformData = {
    students: [
        { id: 1, name: "Yamini", university: "IIT Delhi", status: "Pending", email: "yamini@example.com", phone: "+91 9876543210", address: "Delhi", field: "AI", year: "3rd", bio: "Diagnostics." },
        { id: 2, name: "Meena", university: "BITS Pilani", status: "Verified", email: "meena@example.com", phone: "+91 8876543211", address: "Pilani", field: "IoT", year: "4th", bio: "Specialist." },
        { id: 3, name: "Karthik", university: "MIT Pune", status: "Pending", email: "karthik@example.com", phone: "+91 7765432100", address: "Pune", field: "Blockchain", year: "2nd", bio: "Enthusiast." },
        { id: 4, name: "Kalyani", university: "IISc Bangalore", status: "Verified", email: "kalyani@example.com", phone: "+91 9988776655", address: "Bengaluru", field: "Sustainability", year: "Grad", bio: "Lead." },
        { id: 5, name: "Shive", university: "IIT Bombay", status: "Pending", email: "shive@example.com", phone: "+91 9000011111", address: "Mumbai", field: "CS", year: "Final", bio: "Cybersecurity." },
        { id: 6, name: "Shanmukh", university: "Delhi University", status: "Verified", email: "shanmukh@example.com", phone: "+91 8000022222", address: "Delhi", field: "Economics", year: "2nd", bio: "Founder." },
        { id: 7, name: "Srinath", university: "IIT Madras", status: "Pending", email: "srinath@example.com", phone: "+91 9999900001", address: "Chennai", field: "Robotics", year: "3rd", bio: "Drones." },
        { id: 8, name: "Naveen", university: "Anna University", status: "Verified", email: "naveen@example.com", phone: "+91 9999900002", address: "Chennai", field: "IoT", year: "4th", bio: "AgriTech." },
        { id: 9, name: "Sudharshan", university: "AMU", status: "Pending", email: "sudharshan@example.com", phone: "+91 9999900003", address: "Aligarh", field: "AI", year: "2nd", bio: "NLP." },
        { id: 10, name: "Harsha", university: "Jadavpur University", status: "Verified", email: "harsha@example.com", phone: "+91 9999900004", address: "Kolkata", field: "Web3", year: "3rd", bio: "Governance." }
    ],
    investors: [
        { id: 1, name: "Sarah Capital", company: "Sarah Ventures", status: "Pending", email: "sarah@vc.com", focus: "SaaS" },
        { id: 2, name: "Rajesh Kapoor", company: "Angel Fund", status: "Verified", email: "rajesh@angel.com", focus: "D2C" },
        { id: 3, name: "Lisa Chen", company: "Seed Ventures", status: "Pending", email: "lisa@seed.com", focus: "Web3" },
        { id: 4, name: "David Lee", company: "Impact Inv", status: "Verified", email: "david@impact.com", focus: "Sustain" },
        { id: 5, name: "Maria Garcia", company: "Global Growth", status: "Pending", email: "maria@global.com", focus: "Health" },
        { id: 6, name: "Robert Miller", company: "Peak Partners", status: "Pending", email: "robert@peak.com", focus: "Fintech" },
        { id: 7, name: "Shweta Bansal", company: "Horizon Cap", status: "Verified", email: "shweta@horizon.in", focus: "Consumer" },
        { id: 8, name: "Kenji Tanaka", company: "Tokyo Vent", status: "Pending", email: "tanaka@tokyov.jp", focus: "Deep Tech" },
        { id: 9, name: "Elena Rossi", company: "Milan Seed", status: "Verified", email: "elena@rossi.it", focus: "Fashion" },
        { id: 10, name: "Amit Khanna", company: "Angel", status: "Pending", email: "amit@khanna.me", focus: "AgriTech" }
    ],
    ideas: [
        { id: 1, title: "EcoCharge", student: "Jayram", category: "Sustainability", status: "Pending", description: "Portable solar battery systems for rural microgrid communities.", stage: "Pre-Seed", applications: 18 },
        { id: 2, title: "TechInnovate", student: "Vinay Kumar", category: "SaaS", status: "Approved", description: "AI-driven mentorship and funding matching for early-stage founders.", stage: "Seed", applications: 26 },
        { id: 3, title: "HealthSync", student: "Karthik", category: "HealthTech", status: "Pending", description: "Remote patient monitoring for chronic care and wellness tracking.", stage: "Seed", applications: 12 },
        { id: 4, title: "AgriGrow", student: "Vikram", category: "AgriTech", status: "Pending", description: "Precision farming analytics for smallholder crop optimization.", stage: "Pre-Seed", applications: 14 },
        { id: 5, title: "EduConnect", student: "Beulah", category: "EdTech", status: "Approved", description: "Peer-led learning communities for underserved students.", stage: "Series A", applications: 34 },
        { id: 6, title: "FinPal", student: "Akhil", category: "FinTech", status: "Pending", description: "Mobile financial health tools for first-time salaried workers.", stage: "Pre-Seed", applications: 9 },
        { id: 7, title: "RoboFarm", student: "Arshad", category: "AgriTech", status: "Pending", description: "Autonomous crop scouting robots for productivity gains.", stage: "Seed", applications: 16 },
        { id: 8, title: "BlockVote", student: "Keshavaram", category: "Web3", status: "Approved", description: "Blockchain voting platform for campus governance and clubs.", stage: "Seed", applications: 11 },
        { id: 9, title: "LangConnect", student: "Sree Datha", category: "AI", status: "Pending", description: "Language coaching app for remote internship seekers.", stage: "Pre-Seed", applications: 22 },
        { id: 10, title: "DroneDelivery", student: "Teja", category: "Robotics", status: "Pending", description: "Emergency delivery drones for medical supplies in cities.", stage: "Seed", applications: 20 }
    ],
    meetings: [
        { id: 1, student: "Jayram", investor: "Rajesh Kapoor", date: "2024-03-20", time: "10:00 AM", link: "https://zoom.us/j/123" },
        { id: 2, student: "Yamini", investor: "Sarah Capital", date: "2024-03-22", time: "02:00 PM", link: "https://meet.google.com/abc" },
        { id: 3, student: "Karthik", investor: "David Lee", date: "2024-03-25", time: "11:00 AM", link: "https://teams.com/..." },
        { id: 4, student: "Kalyani", investor: "Robert Miller", date: "2024-03-26", time: "09:00 AM", link: "https://zoom.us/..." },
        { id: 5, student: "Shive", investor: "Lisa Chen", date: "2024-03-27", time: "04:00 PM", link: "https://meet.google.com/..." },
        { id: 6, student: "Shanmukh", investor: "Kenji Tanaka", date: "2024-03-28", time: "10:30 AM", link: "https://zoom.us/..." },
        { id: 7, student: "Srinath", investor: "Shweta Bansal", date: "2024-03-29", time: "11:00 AM", link: "https://meet.google.com/..." },
        { id: 8, student: "Naveen", investor: "Elena Rossi", date: "2024-03-30", time: "02:00 PM", link: "https://zoom.us/..." },
        { id: 9, student: "Sudharshan", investor: "Amit Khanna", date: "2024-04-01", time: "01:00 PM", link: "https://teams.com/..." },
        { id: 10, student: "Harsha", investor: "Maria Garcia", date: "2024-04-02", time: "03:30 PM", link: "https://zoom.us/..." }
    ]
};

const recentActivities = [
    { title: 'Yamini submitted a new project', subtitle: 'AI Study Buddy', time: '10:30 AM' },
    { title: 'Meena updated project details', subtitle: 'HealthCare AI', time: '09:45 AM' },
    { title: 'Karthik applied for funding', subtitle: 'Green Energy Solution', time: '09:20 AM' },
    { title: 'Kalyani sent message to investor', subtitle: 'EcoTrack', time: '08:50 AM' },
    { title: 'Shive added a new idea', subtitle: 'Smart Farming', time: '08:20 AM' }
];

const topProjects = [
    { id: 1, title: 'EcoCharge', owner: 'Shanmukh', tagline: 'Solar battery systems for rural microgrids.', stage: 'Pre-Seed' },
    { id: 2, title: 'TechInnovate', owner: 'Srinath', tagline: 'AI mentorship and founder matching.', stage: 'Seed' },
    { id: 3, title: 'HealthSync', owner: 'Naveen', tagline: 'Chronic care monitoring from home.', stage: 'Seed' },
    { id: 5, title: 'EduConnect', owner: 'Sudharshan', tagline: 'Peer learning for underserved students.', stage: 'Series A' },
    { id: 10, title: 'DroneDelivery', owner: 'Harsha', tagline: 'Medical courier drones for urgent supplies.', stage: 'Seed' }
];

function renderTable(type) {
    const tbody = document.getElementById(`${type}-list`);
    if (!tbody) return;

    const data = platformData[type];
    tbody.innerHTML = data.map(item => {
        if (type === 'students') return renderStudentRow(item);
        if (type === 'investors') return renderInvestorRow(item);
        if (type === 'ideas') return renderIdeaRow(item);
        if (type === 'meetings') return renderMeetingRow(item);
    }).join('');
}

function renderStudentRow(student) {
    return `
        <tr>
            <td>${student.name}</td>
            <td>Student</td>
            <td><span class="status-pill status-${student.status.toLowerCase()}">${student.status}</span></td>
            <td>
                ${student.status === 'Pending' ? `<button class="btn-verify" onclick="updateStatus('students', ${student.id}, 'Verified')">Approve</button>` : ''}
                ${student.status === 'Pending' ? `<button class="btn-action delete" onclick="updateStatus('students', ${student.id}, 'Rejected')">Reject</button>` : ''}
                <button class="btn-action edit" onclick="viewDetails('students', ${student.id})">Details</button>
                <button class="btn-action delete" onclick="deleteItem('students', ${student.id})">Delete</button>
            </td>
        </tr>`;
}

function renderInvestorRow(investor) {
    return `
        <tr>
            <td>${investor.name}</td>
            <td>Investor</td>
            <td><span class="status-pill status-${investor.status.toLowerCase()}">${investor.status}</span></td>
            <td>
                ${investor.status === 'Pending' ? `<button class="btn-verify" onclick="updateStatus('investors', ${investor.id}, 'Verified')">Approve</button>` : ''}
                ${investor.status === 'Pending' ? `<button class="btn-action delete" onclick="updateStatus('investors', ${investor.id}, 'Rejected')">Reject</button>` : ''}
                <button class="btn-action edit" onclick="viewDetails('investors', ${investor.id})">Details</button>
                <button class="btn-action delete" onclick="deleteItem('investors', ${investor.id})">Delete</button>
            </td>
        </tr>`;
}

function renderIdeaRow(idea) {
    return `
        <tr>
            <td>
                <strong>${idea.title}</strong>
                <div class="table-note">${idea.description || 'No description available.'}</div>
            </td>
            <td>${idea.student}</td>
            <td>${idea.category}</td>
            <td><span class="status-pill status-${idea.status.toLowerCase()}">${idea.status}</span></td>
            <td>${idea.applications ?? 0}</td>
            <td>
                ${idea.status === 'Pending' ? `<button class="btn-verify" onclick="updateStatus('ideas', ${idea.id}, 'Approved')">Approve</button>` : ''}
                <button class="btn-action delete" onclick="updateStatus('ideas', ${idea.id}, 'Rejected')">Reject</button>
                <button class="btn-action edit" onclick="viewDetails('ideas', ${idea.id})">Details</button>
            </td>
        </tr>`;
}

function renderMeetingRow(meeting) {
    return `
        <tr>
            <td>${meeting.date} | ${meeting.time}</td>
            <td>${meeting.student}</td>
            <td>${meeting.investor}</td>
            <td>
                <button class="btn-verify" onclick="window.open('${meeting.link}', '_blank')">Join</button>
                <button class="btn-action delete" onclick="deleteItem('meetings', ${meeting.id})">Cancel</button>
            </td>
        </tr>`;
}

function renderDashboardCards() {
    const studentCount = platformData.students.length;
    const projectCount = platformData.ideas.length;
    const investorCount = platformData.investors.length;
    const applicationsCount = platformData.students.length + platformData.investors.length + platformData.ideas.length;

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText('total-students', studentCount);
    setText('total-projects', projectCount);
    setText('total-investors', investorCount);
    setText('total-apps', applicationsCount);

    setText('legend-funding', platformData.ideas.filter(item => item.status === 'Pending').length);
    setText('legend-review', platformData.ideas.filter(item => item.status === 'Pending').length);
    setText('legend-approved', platformData.ideas.filter(item => item.status === 'Approved').length);
    setText('legend-rejected', platformData.ideas.filter(item => item.status === 'Rejected').length || 1);

    renderPageSummaries();
}

function renderPageSummaries() {
    const projectCount = platformData.ideas.length;
    const pendingProjectCount = platformData.ideas.filter(item => item.status === 'Pending').length;
    const approvedProjectCount = platformData.ideas.filter(item => item.status === 'Approved').length;
    const meetingCount = platformData.meetings.length;
    const verifiedInvestors = platformData.investors.filter(item => item.status === 'Verified').length;
    const followUpCount = Math.max(0, Math.floor(meetingCount * 0.35));

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText('ideas-total-projects', projectCount);
    setText('ideas-pending-approvals', pendingProjectCount);
    setText('ideas-approved-projects', approvedProjectCount);
    setText('ideas-active-apps', pendingProjectCount);

    setText('meetings-upcoming-count', meetingCount);
    setText('applications-pending-count', pendingProjectCount);
    setText('active-investors-count', verifiedInvestors);
    setText('meetings-total-count', meetingCount);
    setText('meetings-summary-count', meetingCount);
    setText('investors-verified-count', verifiedInvestors);
    setText('ideas-pending-summary-count', pendingProjectCount);
    setText('meetings-followup-count', followUpCount);
}

function renderDashboardPending() {
    const pendingList = document.getElementById('pending-list');
    if (!pendingList) return;

    const allPending = [
        ...platformData.students.filter(s => s.status === 'Pending').map(s => ({ ...s, type: 'students', role: 'Student', label: s.name })),
        ...platformData.investors.filter(i => i.status === 'Pending').map(i => ({ ...i, type: 'investors', role: 'Investor', label: i.name })),
        ...platformData.ideas.filter(i => i.status === 'Pending').map(i => ({ ...i, type: 'ideas', role: 'Project', label: i.title }))
    ];

    pendingList.innerHTML = allPending.map(item => `
        <tr>
            <td>${item.label}</td>
            <td>${item.role}</td>
            <td><span class="status-pill status-pending">Pending</span></td>
            <td>
                <button class="btn-verify" onclick="updateStatus('${item.type}', ${item.id}, '${item.type === 'ideas' ? 'Approved' : 'Verified'}')">Approve</button>
                <button class="btn-action delete" onclick="updateStatus('${item.type}', ${item.id}, 'Rejected')">Reject</button>
                <button class="btn-action delete" onclick="deleteItem('${item.type}', ${item.id})">Delete</button>
            </td>
        </tr>`;
    }).join('');
}

function renderRecentActivities() {
    const activityMount = document.getElementById('activity-list');
    if (!activityMount) return;

    activityMount.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <strong>${activity.title}</strong>
            <span>${activity.subtitle}</span>
            <small>${activity.time}</small>
        </div>`;
    }).join('');
}

function renderTopProjects() {
    const topMount = document.getElementById('top-projects');
    if (!topMount) return;

    topMount.innerHTML = topProjects.map(project => `
        <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.tagline}</p>
            <p class="project-founders"><strong>Founder:</strong> ${project.owner}</p>
            <div class="project-footer">
                <span>${project.stage}</span>
                <button onclick="viewDetails('ideas', ${project.id})">Details</button>
            </div>
        </div>`;
    }).join('');
}

function updateDashboardStats() {
    renderDashboardCards();
    renderDashboardPending();
}

function filterPendingItems() {
    const query = document.getElementById('dashboardSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#pending-list tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
    });
}

function initOverviewChart() {
    const ctx = document.getElementById('overviewChart');
    if (!ctx) return;

    if (window.overviewPie) {
        window.overviewPie.destroy();
    }

    const data = [
        platformData.ideas.filter(item => item.status === 'Pending').length,
        platformData.ideas.filter(item => item.status === 'Approved').length,
        platformData.ideas.filter(item => item.status === 'Rejected').length || 1,
        platformData.ideas.filter(item => item.status === 'In Review').length || 1
    ];

    window.overviewPie = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Funding Seeking', 'Approved', 'Rejected', 'In Review'],
            datasets: [{
                data,
                backgroundColor: ['#ff8a3c', '#32b768', '#ec5252', '#2094f3'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } }
        }
    });
}

function viewDetails(type, id) {
    if (type === 'students') {
        window.location.href = `admin-student-details.html?id=${id}`;
    } else if (type === 'investors') {
        window.location.href = `admin-investor-details.html?id=${id}`;
    } else {
        window.location.href = `admin-idea-details.html?id=${id}`;
    }
}

function updateStatus(collection, id, newStatus) {
    const item = platformData[collection].find(x => x.id === id);
    if (!item) return;
    item.status = newStatus;
    alert(`${collection.slice(0, -1)} status updated to ${newStatus}`);
    renderTable(collection);
    updateDashboardStats();
}

function deleteItem(collection, id) {
    if (!confirm(`Remove this ${collection.slice(0, -1)}?`)) return;
    platformData[collection] = platformData[collection].filter(x => x.id !== id);
    alert(`${collection.slice(0, -1)} removed.`);
    renderTable(collection);
    updateDashboardStats();
}

function handleLogout() {
    if (confirm('Logout from Admin Panel?')) {
        window.location.href = 'index.html';
    }
}

function initializeDashboard() {
    renderDashboardCards();
    renderRecentActivities();
    renderTopProjects();
    renderTable('students');
    renderTable('investors');
    renderTable('ideas');
    renderTable('meetings');
    initOverviewChart();
    renderPageSummaries();
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeDashboard);
} else {
    initializeDashboard();
}

function addItem(collection) {
    if (collection === 'ideas') {
        const title = prompt('Project title');
        const student = prompt('Founder name');
        const category = prompt('Category');
        if (!title || !student) return;
        const nextId = Math.max(0, ...platformData.ideas.map(i => i.id)) + 1;
        platformData.ideas.push({ id: nextId, title, student, category: category || 'General', status: 'Pending', applications: 0 });
        renderTable('ideas');
        renderDashboardCards();
    }
    if (collection === 'meetings') {
        const student = prompt('Student name');
        const investor = prompt('Investor name');
        const date = prompt('Meeting date (YYYY-MM-DD)');
        const time = prompt('Meeting time');
        if (!student || !investor || !date || !time) return;
        const nextId = Math.max(0, ...platformData.meetings.map(m => m.id)) + 1;
        platformData.meetings.push({ id: nextId, student, investor, date, time, link: 'https://meet.google.com' });
        renderTable('meetings');
    }
}

function filterProjects() {
    const query = document.getElementById('projectSearch')?.value.toLowerCase() || '';
    document.querySelectorAll('#ideas-list tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}

function filterApplications() {
    const query = document.getElementById('applicationSearch')?.value.toLowerCase() || '';
    document.querySelectorAll('#meetings-list tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}

function updateDashboardStats() {
    const studentsCount = document.getElementById('count-students');
    const investorsCount = document.getElementById('count-investors');
    const ideasCount = document.getElementById('count-ideas');

    if (studentsCount) studentsCount.textContent = platformData.students.length;
    if (investorsCount) investorsCount.textContent = platformData.investors.length;
    if (ideasCount) ideasCount.textContent = platformData.ideas.length;

    renderDashboardPending();
}

function renderDashboardPending() {
    const pendingList = document.getElementById('pending-list');
    if (!pendingList) return;

    const allPending = [
        ...platformData.students.filter(s => s.status === 'Pending').map(s => ({ ...s, type: 'students', role: 'Student', label: s.name })),
        ...platformData.investors.filter(i => i.status === 'Pending').map(i => ({ ...i, type: 'investors', role: 'Investor', label: i.name })),
        ...platformData.ideas.filter(i => i.status === 'Pending').map(i => ({ ...i, type: 'ideas', role: 'Project', label: i.title }))
    ];

    pendingList.innerHTML = allPending.map(item => `
        <tr>
            <td>${item.label}</td>
            <td>${item.role}</td>
            <td><span class="status-pill status-pending">Pending</span></td>
            <td>
                <button class="btn-verify" onclick="updateStatus('${item.type}', ${item.id}, '${item.role === 'Project' ? 'Approved' : 'Verified'}')">Approve</button>
                <button class="btn-action delete" onclick="updateStatus('${item.type}', ${item.id}, 'Rejected')">Reject</button>
            </td>
        </tr>`).join('');
}

function renderStudentRow(s) {
    return `
        <tr>
            <td>${s.name}</td>
            <td>${s.university}</td>
            <td><span class="status-pill status-${s.status.toLowerCase()}">${s.status}</span></td>
            <td>
                ${s.status === 'Pending' ? `<button class="btn-verify" onclick="updateStatus('students', ${s.id}, 'Verified')">Verify</button>` : ''}
                <button class="btn-action edit" onclick="editItem('students', ${s.id})">Edit</button>
                <button class="btn-action delete" onclick="deleteItem('students', ${s.id})">Delete</button>
            </td>
        </tr>`;
}

function renderInvestorRow(i) {
    return `
        <tr>
            <td>${i.name}</td>
            <td>${i.company}</td>
            <td><span class="status-pill status-${i.status.toLowerCase()}">${i.status}</span></td>
            <td>
                ${i.status === 'Pending' ? `<button class="btn-verify" onclick="updateStatus('investors', ${i.id}, 'Verified')">Verify</button>` : ''}
                <button class="btn-action edit" onclick="editItem('investors', ${i.id})">Edit</button>
                <button class="btn-action delete" onclick="deleteItem('investors', ${i.id})">Delete</button>
            </td>
        </tr>`;
}

function renderIdeaRow(idea) {
    return `
        <tr>
            <td>${idea.title}</td>
            <td>${idea.student}</td>
            <td>${idea.category || 'General'}</td>
            <td><span class="status-pill status-${idea.status.toLowerCase()}">${idea.status}</span></td>
            <td>${idea.applications ?? 0}</td>
            <td>
                ${idea.status === 'Pending' ? `<button class="btn-verify" onclick="updateStatus('ideas', ${idea.id}, 'Approved')">Approve</button>` : ''}
                <button class="btn-action delete" onclick="updateStatus('ideas', ${idea.id}, 'Rejected')">Reject</button>
                <button class="btn-action edit" onclick="viewDetails('ideas', ${idea.id})">Details</button>
            </td>
        </tr>`;
}

function renderMeetingRow(m) {
    return `
        <tr>
            <td>${m.date} | ${m.time}</td>
            <td>${m.student}</td>
            <td>${m.investor}</td>
            <td>
                <button class="btn-verify" onclick="window.open('${m.link}', '_blank')">Join</button>
                <button class="btn-action delete" onclick="deleteItem('meetings', ${m.id})">Cancel</button>
            </td>
        </tr>`;
}

function viewDetails(type, id) {
    if (type === 'students') {
        window.location.href = `admin-student-details.html?id=${id}`;
    } else if (type === 'investors') {
        window.location.href = `admin-investor-details.html?id=${id}`;
    } else {
        window.location.href = `admin-idea-details.html?id=${id}`;
    }
}

function renderDetailsPage(type) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const data = platformData[type + 's']?.find(x => x.id === id);
    const container = document.getElementById('details-mount');
    if (!container || !data) return;

    container.innerHTML = `
        <div class="stat-card" style="padding: 40px;">
            <h2>Full Registration Profile: ${data.name || data.title}</h2>
            <hr>
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
                <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>${type === 'student' ? 'University' : 'Firm'}:</strong> ${data.university || data.company || 'N/A'}</p>
                <p><strong>Address:</strong> ${data.address || 'N/A'}</p>
                <p><strong>${type === 'student' ? 'Field of Study' : 'Investment Focus'}:</strong> ${data.field || data.focus || 'N/A'}</p>
                <p><strong>Status:</strong> <span class="status-pill status-${data.status.toLowerCase()}">${data.status}</span></p>
            </div>
            <div style="margin-top: 20px;">
                <h3>About / Bio:</h3>
                <p>${data.bio || 'No details available.'}</p>
            </div>
            <div style="margin-top: 30px;">
                <button class="btn-verify" onclick="updateStatus('${type}s', ${data.id}, 'Verified')">Approve Account</button>
                <button class="btn-action delete" onclick="deleteItem('${type}s', ${data.id})">Reject Registration</button>
            </div>
        </div>`;
}

