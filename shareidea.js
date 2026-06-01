/**
 * ===== LOGOUT FUNCTION =====
 */
function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

/**
 * ===== PAGE INITIALIZATION =====
 */
document.addEventListener('DOMContentLoaded', function() {
    initializePageVisuals();
    initializeFormHandlers();
    initializeFileUpload();
    initializeHamburgerMenu();
    renderSubmittedIdeas();
});

/**
 * ===== 1. UPDATE PAGE VISUALS (Hero & Background Images) =====
 * Refreshes images every 60 seconds for dynamic appearance
 */
function initializePageVisuals() {
    updatePageVisuals();
    setInterval(updatePageVisuals, 60000); // 60 seconds
}

function updatePageVisuals() {
    const timestamp = new Date().getTime();
    
    // Update Hero Image (Entrepreneur/Startup theme)
    const heroImg = document.getElementById('rotating-hero');
    if (heroImg) {
        heroImg.src = `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&h=400&q=80&sig=${timestamp}`;
    }
    
    // Update Background (Warm/Peachy aesthetic theme)
    const bgContainer = document.getElementById('app-wrapper');
    if (bgContainer) {
        const bgUrl = `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&h=1080&q=80&sig=${timestamp}`;
        // Apply smooth overlay for better text readability
        bgContainer.style.backgroundImage = `linear-gradient(rgba(255,245,230,0.92), rgba(255,245,230,0.92)), url('${bgUrl}')`;
    }
}

/**
 * ===== 2. FORM HANDLERS (Submit & Reset) =====
 */
function initializeFormHandlers() {
    const form = document.getElementById('startup-form');
    
    // SUBMIT BUTTON
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check terms checkbox
        const termsCheckbox = document.getElementById('terms-checkbox');
        if (!termsCheckbox.checked) {
            showMessage('❌ Please accept Terms & Conditions to continue.', 'error');
            highlightTermsError();
            return;
        }
        
        // Collect form data
        const formData = {
            title: document.getElementById('idea-title').value,
            description: document.getElementById('idea-desc').value,
            category: document.getElementById('category').value,
            features: document.getElementById('project-features').value,
            solution: document.getElementById('solution').value,
            timeline: document.getElementById('timeline').value,
            funds: document.getElementById('funds').value,
            fundsPurpose: document.getElementById('funds-purpose').value,
            spendCategory: document.getElementById('spend-category').value,
            categoryAmount: document.getElementById('category-amount').value,
            stage: document.querySelector('input[name="stage"]:checked').value,
            protoLink: document.getElementById('proto-link').value,
            termsAccepted: termsCheckbox.checked
        };
        
        // Validate form
        if (!validateForm(formData)) {
            showMessage('❌ Please fill in all required fields correctly.', 'error');
            return;
        }
        
        // Show success message
        console.log('Form Data Submitted:', formData);
        showMessage(`✅ Success! Your idea "${formData.title}" has been published and is now visible to the community.`, 'success');
        // Store the submitted idea in localStorage for later display on student home
        let sharedIdeas = JSON.parse(localStorage.getItem('student_shared_ideas')) || [];
        sharedIdeas.unshift({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          features: formData.features,
          solution: formData.solution,
          timeline: formData.timeline,
          funds: formData.funds,
          fundsPurpose: formData.fundsPurpose,
          spendCategory: formData.spendCategory,
          categoryAmount: formData.categoryAmount,
          stage: formData.stage,
          protoLink: formData.protoLink,
          status: 'Pending',
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('student_shared_ideas', JSON.stringify(sharedIdeas));
        removeTermsError();
        renderSubmittedIdeas();
        
        // Reset form after 2 seconds
        setTimeout(() => {
            form.reset();
            hideMessage();
        }, 2000);
    });
    
    // RESET BUTTON
    form.addEventListener('reset', function() {
        resetTags();
        removeTermsError();
        showMessage('✅ Form has been cleared.', 'success');
        setTimeout(hideMessage, 2000);
    });
}

/**
 * ===== 4. FILE UPLOAD HANDLER =====
 */
function initializeFileUpload() {
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('file-upload');
    const uploadLink = document.querySelector('.upload-link');
    
    // Click to upload
    uploadLink.addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });
    
    uploadBox.addEventListener('click', (e) => {
        if (e.target !== uploadLink) {
            fileInput.click();
        }
    });
    
    // Drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('dragover');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('dragover');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelection(files[0]);
        }
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelection(e.target.files[0]);
        }
    });
}

function handleFileSelection(file) {
    // Check file type - Documents and Images
    const validDocumentTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 
                        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    
    const isValidDocument = validDocumentTypes.includes(file.type);
    const isValidImage = validImageTypes.includes(file.type);
    
    if (!isValidDocument && !isValidImage) {
        showMessage('❌ Invalid file type. Please upload PDF, PowerPoint, Word documents, or Images (JPG, PNG, GIF, WebP).', 'error');
        return;
    }
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        showMessage('❌ File size exceeds 5MB limit.', 'error');
        return;
    }
    
    // Determine file type icon
    let fileIcon = '📄';
    if (isValidImage) {
        fileIcon = '🖼️';
    } else if (file.type.includes('presentation')) {
        fileIcon = '📊';
    } else if (file.type.includes('word')) {
        fileIcon = '📝';
    }
    
    // Display file info
    const fileInfo = document.getElementById('file-info');
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
    fileInfo.textContent = `${fileIcon} ${file.name} (${fileSizeMB} MB)`;
    
    const fileType = isValidImage ? 'Image' : 'Document';
    showMessage(`✅ ${fileType} "${file.name}" uploaded successfully!`, 'success');
    setTimeout(hideMessage, 3000);
}

/**
 * ===== 5. HAMBURGER MENU (Mobile Navigation) =====
 */
function initializeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

/**
 * ===== 6. FORM VALIDATION =====
 */
function validateForm(data) {
    // Check required fields
    if (!data.title || data.title.trim().length < 3) {
        return false;
    }
    if (!data.description || data.description.trim().length < 10) {
        return false;
    }
    if (!data.solution || data.solution.trim().length < 10) {
        return false;
    }
    if (!data.features || data.features.trim().length < 5) {
        return false;
    }
    if (!data.timeline || data.timeline.trim().length < 2) {
        return false;
    }
    if (!data.funds || data.funds <= 0) {
        return false;
    }
    if (!data.fundsPurpose || data.fundsPurpose.trim().length < 10) {
        return false;
    }
    if (!data.categoryAmount || data.categoryAmount <= 0) {
        return false;
    }
    return true;
}

/**
 * ===== 7. MESSAGE DISPLAY HELPERS =====
 */
function showMessage(message, type) {
    let messageDiv = document.getElementById('form-message');
    
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'form-message';
        messageDiv.className = `form-message ${type}`;
        const formCard = document.querySelector('.form-card');
        formCard.insertBefore(messageDiv, formCard.firstChild);
    }
    
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type} show`;
}

function hideMessage() {
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
        messageDiv.classList.remove('show');
    }
}

/**
 * ===== 8. TERMS ERROR HIGHLIGHTING =====
 */
function highlightTermsError() {
    const termsAgreement = document.querySelector('.terms-agreement');
    if (termsAgreement) {
        termsAgreement.classList.add('error');
    }
}

function removeTermsError() {
    const termsAgreement = document.querySelector('.terms-agreement');
    if (termsAgreement) {
        termsAgreement.classList.remove('error');
    }
}

// Remove error when checkbox is clicked
document.addEventListener('DOMContentLoaded', function() {
    const termsCheckbox = document.getElementById('terms-checkbox');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', removeTermsError);
    }
});

/**
 * ===== 9. RENDER SUBMITTED IDEAS =====
 */
function renderSubmittedIdeas() {
    const container = document.getElementById('submitted-ideas-section');
    const list = document.getElementById('submitted-ideas-list');
    
    if (!container || !list) return;
    
    let sharedIdeas = JSON.parse(localStorage.getItem('student_shared_ideas'));
    
    // Add 2 sample projects if none exist
    if (!sharedIdeas || sharedIdeas.length === 0) {
        sharedIdeas = [
            {
                title: "KisanDrone",
                description: "Autonomous drone system for precision agriculture, crop scouting, and targeted pesticide spraying.",
                category: "Sustainability",
                funds: 2500000,
                stage: "Prototype",
                status: "Pending",
                submittedAt: new Date(Date.now() - 86400000 * 2).toISOString()
            },
            {
                title: "UPI PayPulse",
                description: "Voice-based UPI payment system for visually impaired and elderly users using regional Indian languages.",
                category: "Fintech",
                funds: 1500000,
                stage: "Idea",
                status: "Approved",
                submittedAt: new Date(Date.now() - 86400000 * 5).toISOString()
            }
        ];
        localStorage.setItem('student_shared_ideas', JSON.stringify(sharedIdeas));
    }
    
    if (sharedIdeas.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    list.innerHTML = '';
    
    sharedIdeas.forEach(idea => {
        const dateObj = new Date(idea.submittedAt || Date.now());
        const dateStr = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        
        const status = idea.status || 'Pending';
        let statusBadgeClass = 'bg-warning text-dark';
        if (status === 'Approved') statusBadgeClass = 'bg-success';
        else if (status === 'Rejected') statusBadgeClass = 'bg-danger';
        
        const card = document.createElement('div');
        card.className = 'card shadow-sm border-0';
        card.innerHTML = `
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title mb-0" style="color: #ff6a00; font-weight: 700;">${idea.title}</h5>
                    <span class="badge ${statusBadgeClass} px-3 py-2" style="font-size: 0.85rem; border-radius: 20px;">${status}</span>
                </div>
                <div class="mb-3">
                    <span class="badge bg-light text-dark border me-2">${idea.category}</span>
                    <span class="text-muted small">Submitted on ${dateStr}</span>
                </div>
                <p class="card-text text-muted mb-3">${idea.description}</p>
                <div class="row g-2 mb-0">
                    <div class="col-sm-6">
                        <small class="text-muted d-block">Funding Required</small>
                        <strong>₹${idea.funds ? idea.funds.toLocaleString('en-IN') : '0'}</strong>
                    </div>
                    <div class="col-sm-6">
                        <small class="text-muted d-block">Project Stage</small>
                        <strong class="text-capitalize">${idea.stage || 'Idea'}</strong>
                    </div>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
}

