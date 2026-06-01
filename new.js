 document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("❌ Password and Confirm Password do not match");
    return;
  }

  const fullName = document.getElementById("fullName").value;
  const collegeName = document.getElementById("collegeName").value;
  const fileInput = document.getElementById("idCardFile");
  const file = fileInput ? fileInput.files[0] : null;
  const fileName = file ? file.name : "student_id_card.pdf";

  const newDoc = {
    id: Date.now(),
    name: fullName,
    role: "Student",
    project: collegeName,
    docType: "Student ID Card Verification",
    fileName: fileName,
    date: new Date().toISOString().split('T')[0],
    status: "Pending"
  };

  try {
    let docs = JSON.parse(localStorage.getItem('admin_documents'));
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

  alert("✅ Student account created successfully! Your verification document has been sent to the Admin.");
  this.reset();
  window.location.href = "login.html";
});
