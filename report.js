// ================= REPORT DATA =================
const reportData = {
  'week5': {
    week: 'Week 5',
    date: 'January 15, 2026',
    status: 'approved',
    viewed: 22,
    abstract: 'AI education platform focusing on personalized learning paths and teacher analytics.',
    projLinks: 'https://demo.startupcollab.in/ai-edu',
    devPercent: 75,
    timeRemaining: '3 months',
    achievements: 'Successfully launched beta mobile app on iOS. Signed partnerships with 3 premium schools for testing.',
    challenges: 'Experienced slow database query performance. Solution: Implemented indexing and Redis caching.',
    marketingDoubts: 'Unsure about the effectiveness of LinkedIn ads for reaching school principals vs direct email.',
    futurePlans: 'Onboard 500 more users. Finalize the gamification module for student engagement.',
    weeklySpend: '45,000',
    spendCategory: 'infrastructure',
    teamUpdates: 'Karthik: Developed AI core; Archana: Refined mobile UI; Jayram: Managed school outreach.',
    documents: 'AI-Powered Education - Week 5 Progress.pdf',
  },
  'week4': {
    week: 'Week 4',
    date: 'January 8, 2026',
    status: 'approved',
    viewed: 18,
    abstract: 'Core backend architecture and API integration phase.',
    projLinks: 'https://github.com/ai-edu/core-repo',
    devPercent: 60,
    timeRemaining: '4 months',
    achievements: 'Finished API integrations for user auth. Completed the teacher dashboard wireframes.',
    challenges: 'Initial integration errors with third-party auth. Solution: Switched to OAuth 2.0 standard.',
    marketingDoubts: 'Is our pricing model too high for government-aided schools?',
    futurePlans: 'Begin mobile app coding. Conduct first focus group with educators.',
    weeklySpend: '30,000',
    spendCategory: 'development',
    teamUpdates: 'Yamini and Karthik focused on backend logic. Jayram conducted market surveys.',
    documents: 'AI-Powered Education - Week 4 Progress.pdf',
  },
  'week3': {
    week: 'Week 3',
    date: 'January 1, 2026',
    status: 'approved',
    viewed: 15,
    abstract: 'Frontend design and cloud infrastructure setup.',
    projLinks: 'https://figma.com/file/ai-edu-design',
    devPercent: 45,
    timeRemaining: '5 months',
    achievements: 'Completed UI designs in Figma. AWS infrastructure is live and configured.',
    challenges: 'Cost of cloud hosting was higher than estimated. Solution: Optimized instance sizes.',
    marketingDoubts: 'Do we need a dedicated mobile app or is a responsive web app enough?',
    futurePlans: 'Finalize database schema. Setup CI/CD pipeline.',
    weeklySpend: '20,000',
    spendCategory: 'infrastructure',
    teamUpdates: 'Archana finished Figma designs. Karthik configured AWS servers.',
    documents: 'AI-Powered Education - Week 3 Progress.pdf',
  },
  'week2': {
    week: 'Week 2',
    date: 'December 25, 2025',
    status: 'approved',
    viewed: 12,
    abstract: 'Market research validation and SRS documentation.',
    projLinks: 'None',
    devPercent: 20,
    timeRemaining: '6 months',
    achievements: 'Validted problem statement with 20 teachers. Completed Software Requirement Specification.',
    challenges: 'Conflicting feedback on feature priorities. Solution: Created a feature matrix.',
    marketingDoubts: 'Should we target parents directly or go through school systems?',
    futurePlans: 'Start UI design. Choose technology stack.',
    weeklySpend: '5,000',
    spendCategory: 'other',
    teamUpdates: 'Full team involved in requirements gathering and brainstorming.',
    documents: 'AI-Powered Education - Week 2 Progress.pdf',
  },
  'week1': {
    week: 'Week 1',
    date: 'December 18, 2025',
    status: 'approved',
    viewed: 8,
    abstract: 'Initial ideation and team formation.',
    projLinks: 'None',
    devPercent: 5,
    timeRemaining: '7 months',
    achievements: 'Idea finalized. Team roles assigned. Market research initiated.',
    challenges: 'Defining the unique value proposition. Solution: Focused on adaptive data insights.',
    marketingDoubts: 'None at this stage.',
    futurePlans: 'Conduct more market research. Draft the business plan.',
    weeklySpend: '2,000',
    spendCategory: 'marketing',
    teamUpdates: 'Formed the team and set project goals.',
    documents: 'AI-Powered Education - Week 1 Progress.pdf',
  }
};

// ================= LOAD REPORT =================
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const reportId = params.get('id') || 'week5';
  
  const report = reportData[reportId];
  
  if (report) {
    loadReport(report);
  } else {
    loadReport(reportData['week5']); // Default to week 5
  }
});

// ================= DISPLAY REPORT =================
function loadReport(report) {
  // Header
  const reportWeekEl = document.getElementById('reportWeek');
  const reportDateEl = document.getElementById('reportDate');
  const statusEl = document.getElementById('reportStatus');

  if (reportWeekEl) reportWeekEl.textContent = report.week + ' Progress Report';
  if (reportDateEl) reportDateEl.textContent = 'Submitted on: ' + report.date;

  if (statusEl) {
    statusEl.textContent = report.status === 'approved' ? '✓ APPROVED' : '⏳ PENDING';
    statusEl.className = 'status-badge ' + report.status;
  }

  const statusInfoEl = document.querySelector('.status-info');
  if (statusInfoEl) statusInfoEl.textContent = 'Viewed by ' + report.viewed + ' investors';

  // Overview
  const projectNameEl = document.getElementById('projectName');
  const teamLeadEl = document.getElementById('teamLead');
  const currentStatusEl = document.getElementById('currentStatus');
  const fundingGoalEl = document.getElementById('fundingGoal');

  if (projectNameEl) projectNameEl.textContent = report.projectName;
  if (teamLeadEl) teamLeadEl.textContent = report.teamLead;
  if (currentStatusEl) currentStatusEl.textContent = report.currentStatus;
  if (fundingGoalEl) fundingGoalEl.textContent = report.fundingGoal;

  // Populate extra detail text if the markup contains ids.
  // (This report.html includes many sections with fixed sample text.)
  // If you later add ids to those sections, this script can update them too.

  const abstractEl = document.getElementById('reportAbstract');
  if (abstractEl && report.abstract) abstractEl.textContent = report.abstract;

  const docsEl = document.getElementById('reportDocuments');
  if (docsEl && report.documents) docsEl.textContent = report.documents;

  const solutionEl = document.getElementById('reportSolution');
  if (solutionEl && report.solution) solutionEl.textContent = report.solution;

  const revenueEl = document.getElementById('reportRevenue');
  if (revenueEl && report.revenue) revenueEl.textContent = report.revenue;

  const challengesEl = document.getElementById('reportChallenges');
  if (challengesEl && report.challenges) challengesEl.textContent = report.challenges;
}

// ================= LOGOUT =================
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

console.log("Report Page Loaded");
