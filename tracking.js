// ================= LOGOUT FUNCTION =================
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

  const fileInput = document.getElementById("fileInput");
const fileInfo = document.getElementById("fileInfo");

function navigate(page) {
  alert("Navigating to " + page + " page");
}

function viewIdeas() {
  alert("Opening My Ideas page");
}

function viewReport() {
  // This function is no longer used - View Report buttons now directly navigate to report.html
  // with URL parameters like report.html?id=week5
}

function resubmit() {
  alert("Resubmit request sent");
}

function selectFile() {
  fileInput.click();
}

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (!allowedTypes.includes(file.type)) {
    alert("Only PDF, DOC, DOCX files are allowed");
    fileInput.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert("File size must be under 10 MB");
    fileInput.value = "";
    return;
  }

  fileInfo.innerHTML = `📄 ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`;
});

function submitUpdate() {
  const projOverview = document.getElementById("projOverview")?.value || "";
  const achievements = document.getElementById("achievements")?.value || "";
  const futurePlans = document.getElementById("futurePlans")?.value || "";
  const teamUpdates = document.getElementById("teamUpdates")?.value || "";

  if (!projOverview || !achievements || !futurePlans || !teamUpdates) {
    alert("Please fill out all required fields first.");
    return;
  }

  let studentName = "Amit Mehra";
  try {
    const profiles = JSON.parse(localStorage.getItem('collab_profiles'));
    if (profiles && profiles['student-pro'] && profiles['student-pro'].name) {
      studentName = profiles['student-pro'].name;
    }
  } catch(e) {}

  const file = fileInput.files[0];
  const fileName = file ? file.name : "weekly_progress_report.pdf";
  const docType = "Weekly Progress PDF";

  const newDoc = {
    id: Date.now(),
    name: studentName,
    role: "Student",
    project: "EcoCharge 🌱",
    docType: docType,
    fileName: fileName,
    date: new Date().toISOString().split('T')[0],
    status: "Pending"
  };

  try {
    let docs = JSON.parse(localStorage.getItem('admin_documents'));
    // If not found in localStorage, fetch DEFAULT_DOCUMENTS array size and save it first
    if (!docs) {
      docs = [
        { id: 1, name: "Amit Mehra", role: "Student", project: "EcoCharge 🌱", docType: "Weekly Progress PDF", fileName: "Week_3_Metrics_Update.pdf", date: "2026-05-30", status: "Approved" },
        { id: 2, name: "Sneha Reddy", role: "Student", project: "UPI PayPulse 📱", docType: "Pitch Deck Proposal", fileName: "UPI_PayPulse_PitchDeck.pdf", date: "2026-05-29", status: "Pending" },
        { id: 3, name: "Namita Thapar", role: "Investor", project: "Emcure Pharmaceuticals", docType: "Accreditation Proof", fileName: "Accreditation_Doc_Namita.pdf", date: "2026-05-28", status: "Approved" },
        { id: 4, name: "Priya Singh", role: "Student", project: "EcoWeave 🍃", docType: "Weekly Progress PDF", fileName: "Week_1_Materials_Report.pdf", date: "2026-05-27", status: "Pending" },
        { id: 5, name: "Aman Gupta", role: "Investor", project: "boAt Lifestyle", docType: "KYC verification", fileName: "Aman_Gupta_KYC_Proof.pdf", date: "2026-05-26", status: "Approved" },
        { id: 6, name: "Rohan Patel", role: "Student", project: "Swasthya Kiosk 🏥", docType: "Accredited Lab Report", fileName: "Kiosk_Vitals_Certification.pdf", date: "2026-05-25", status: "Rejected" }
      ];
    }
    docs.unshift(newDoc);
    localStorage.setItem('admin_documents', JSON.stringify(docs));
  } catch (e) {
    console.error("Error saving document to admin store", e);
  }

  alert("Project update and document submitted successfully! It has been received in the Admin Documents Store.");
  
  // Reset form
  document.getElementById("progressUpdateForm")?.reset();
  if (fileInfo) fileInfo.textContent = "";
  if (fileInput) fileInput.value = "";
}
