document.getElementById("investorForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("❌ Password and Confirm Password do not match");
    return;
  }

  const fullName = document.getElementById("fullName").value;
  const companyName = document.getElementById("companyName").value;

  const companyIdFile = document.getElementById("companyIdFile");
  const compFile = companyIdFile ? companyIdFile.files[0] : null;
  const compFileName = compFile ? compFile.name : "company_id_proof.pdf";

  const aadharFile = document.getElementById("aadharFile");
  const aadharF = aadharFile ? aadharFile.files[0] : null;
  const aadharFileName = aadharF ? aadharF.name : "aadhar_card_proof.pdf";

  const doc1 = {
    id: Date.now(),
    name: fullName,
    role: "Investor",
    project: companyName,
    docType: "KYC verification",
    fileName: compFileName,
    date: new Date().toISOString().split('T')[0],
    status: "Pending"
  };

  const doc2 = {
    id: Date.now() + 1,
    name: fullName,
    role: "Investor",
    project: companyName,
    docType: "Aadhar Verification",
    fileName: aadharFileName,
    date: new Date().toISOString().split('T')[0],
    status: "Pending"
  };

  try {
    let docs = JSON.parse(localStorage.getItem('admin_documents'));
    if (!docs) {
        docs = [
        { id: 1, name: "Karthik", role: "Student", project: "EcoCharge 🌱", docType: "Weekly Progress PDF", fileName: "Week_3_Metrics_Update.pdf", date: "2026-05-30", status: "Approved" },
        { id: 2, name: "Yamini", role: "Student", project: "UPI PayPulse 📱", docType: "Pitch Deck Proposal", fileName: "UPI_PayPulse_PitchDeck.pdf", date: "2026-05-29", status: "Pending" },
        { id: 3, name: "Namita Thapar", role: "Investor", project: "Emcure Pharmaceuticals", docType: "Accreditation Proof", fileName: "Accreditation_Doc_Namita.pdf", date: "2026-05-28", status: "Approved" },
        { id: 4, name: "Kalyani", role: "Student", project: "EcoWeave 🍃", docType: "Weekly Progress PDF", fileName: "Week_1_Materials_Report.pdf", date: "2026-05-27", status: "Pending" },
        { id: 5, name: "Aman Gupta", role: "Investor", project: "boAt Lifestyle", docType: "KYC verification", fileName: "Aman_Gupta_KYC_Proof.pdf", date: "2026-05-26", status: "Approved" },
        { id: 6, name: "Sudharshan", role: "Student", project: "Swasthya Kiosk 🏥", docType: "Accredited Lab Report", fileName: "Kiosk_Vitals_Certification.pdf", date: "2026-05-25", status: "Rejected" }
      ];
    }
    docs.unshift(doc1, doc2);
    localStorage.setItem('admin_documents', JSON.stringify(docs));
  } catch (e) {
    console.error("Error saving documents to admin store", e);
  }

  alert("✅ Investor account created successfully! Your verification documents have been sent to the Admin.");
  this.reset();
  window.location.href = "login.html";
});
