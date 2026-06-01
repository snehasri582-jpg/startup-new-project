// WhatsApp Style Chat Logic - Investor Dashboard (Student Contacts)

const contacts = [
    {
        id: 1,
        name: "Arjun Mehta",
        phone: "+91 98111 22233",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        lastMessage: "We've deployed the beta version.",
        time: "10:30 AM",
        unread: 1,
        online: true,
        company: "TechNova (AI Education)",
        about: "Founder & CEO, TechNova. CS Undergrad at IIT.",
        messages: [
            { id: 1, text: "Good morning! Any updates on the project?", time: "10:05 AM", type: "sent" },
            { id: 2, text: "Yes sir. We've deployed the beta version.", time: "10:30 AM", type: "received" }
        ]
    },
    {
        id: 2,
        name: "Sneha Patil",
        phone: "+91 98222 33344",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        lastMessage: "The presentation is ready.",
        time: "Yesterday",
        unread: 0,
        online: false,
        company: "EcoCharge (Sustainability)",
        about: "Co-Founder, EcoCharge. Environmental Science Major.",
        messages: [
            { id: 1, text: "Please send the pitch deck before our 3PM meeting.", time: "Yesterday, 1:00 PM", type: "sent" },
            { id: 2, text: "The presentation is ready. I will email it now.", time: "Yesterday, 1:15 PM", type: "received" }
        ]
    },
    {
        id: 3,
        name: "Karan Desai",
        phone: "+91 98333 44455",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        lastMessage: "User acquisition grew by 15% this week.",
        time: "Yesterday",
        unread: 0,
        online: true,
        company: "FinTrack (Fintech)",
        about: "Founder, FinTrack. MBA Student.",
        messages: [
            { id: 1, text: "How are the numbers looking?", time: "Yesterday, 4:00 PM", type: "sent" },
            { id: 2, text: "User acquisition grew by 15% this week.", time: "Yesterday, 4:10 PM", type: "received" }
        ]
    },
    {
        id: 4,
        name: "Aisha Khan",
        phone: "+91 98444 55566",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        lastMessage: "We fixed the bug on the checkout page.",
        time: "Tuesday",
        unread: 2,
        online: true,
        company: "HealthNest",
        about: "CTO, HealthNest. Software Developer.",
        messages: [
            { id: 1, text: "Customers were reporting issues with payments.", time: "Tuesday, 9:00 AM", type: "sent" },
            { id: 2, text: "We fixed the bug on the checkout page.", time: "Tuesday, 10:00 AM", type: "received" }
        ]
    },
    {
        id: 5,
        name: "Rohit Sharma",
        phone: "+91 98555 66677",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg",
        lastMessage: "Looking forward to our sync up.",
        time: "Monday",
        unread: 0,
        online: false,
        company: "AgriTech Solutions",
        about: "Co-Founder. Focus on rural supply chains.",
        messages: [
            { id: 1, text: "Let's schedule a call for next week.", time: "Monday, 11:00 AM", type: "sent" },
            { id: 2, text: "Looking forward to our sync up.", time: "Monday, 11:30 AM", type: "received" }
        ]
    },
    {
        id: 6,
        name: "Priya Singh",
        phone: "+91 98666 77788",
        avatar: "https://randomuser.me/api/portraits/women/35.jpg",
        lastMessage: "The new design looks amazing.",
        time: "Sunday",
        unread: 0,
        online: false,
        company: "DesignPro",
        about: "Lead Designer & Founder.",
        messages: [
            { id: 1, text: "Did you update the UI mockups?", time: "Sunday, 2:00 PM", type: "sent" },
            { id: 2, text: "Yes, they are in the drive. The new design looks amazing.", time: "Sunday, 2:30 PM", type: "received" }
        ]
    },
    {
        id: 7,
        name: "Vikas Reddy",
        phone: "+91 98777 88899",
        avatar: "https://randomuser.me/api/portraits/men/25.jpg",
        lastMessage: "We need more servers for scaling.",
        time: "Last Week",
        unread: 0,
        online: false,
        company: "CloudSync",
        about: "Backend Engineer & Founder.",
        messages: [
            { id: 1, text: "Is the infrastructure handling the load?", time: "Last Week, 10:00 AM", type: "sent" },
            { id: 2, text: "We need more servers for scaling.", time: "Last Week, 10:30 AM", type: "received" }
        ]
    }
];

let activeContactId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
    
    // Check if there's a contact ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const contactParam = urlParams.get('student');
    
    if (contactParam) {
        const contactToOpen = contacts.find(c => c.name.toLowerCase().includes(contactParam.toLowerCase()) || c.id.toString() === contactParam);
        if (contactToOpen) {
            selectContact(contactToOpen.id, true);
        } else {
            selectContact(contacts[0].id, true);
        }
    } else {
        selectContact(contacts[0].id, true);
    }

    // Input functionality
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    sendButton.addEventListener('click', sendMessage);
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        renderContacts(e.target.value);
    });
});

function renderContacts(searchQuery = '') {
    const contactsList = document.getElementById('contactsList');
    contactsList.innerHTML = '';

    const filteredContacts = contacts.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        c.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredContacts.forEach(contact => {
        const isActive = contact.id === activeContactId ? 'active' : '';
        const unreadBadge = contact.unread > 0 ? `<div class="wa-unread-badge">${contact.unread}</div>` : '';

        const contactEl = document.createElement('div');
        contactEl.className = `wa-contact-item ${isActive}`;
        
        // Avatar click opens mini DP modal, rest of row selects chat
        contactEl.innerHTML = `
            <img src="${contact.avatar}" alt="${contact.name}" class="wa-contact-avatar" onclick="openDpModal(${contact.id}, event)">
            <div class="wa-contact-info" onclick="selectContact(${contact.id})">
                <div class="wa-contact-top">
                    <div class="wa-contact-name">${contact.name}</div>
                    <div class="wa-contact-time">${contact.time}</div>
                </div>
                <div class="wa-contact-bottom">
                    <div class="wa-contact-last-msg">${contact.lastMessage}</div>
                    ${unreadBadge}
                </div>
            </div>
        `;
        contactsList.appendChild(contactEl);
    });
}

function selectContact(id, isInitialLoad = false) {
    activeContactId = id;
    
    // Update contact list UI
    document.querySelectorAll('.wa-contact-item').forEach(el => el.classList.remove('active'));
    renderContacts(document.getElementById('searchInput').value);
    
    // Mark as read
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        contact.unread = 0;
        renderChatArea(contact);
        populateContactInfo(contact);
        
        // Hide chat area on initial load for mobile
        if (isInitialLoad && window.innerWidth <= 768) {
            document.getElementById('chatArea').style.display = 'none';
        }
    }
}

function renderChatArea(contact) {
    const chatArea = document.getElementById('chatArea');
    const emptyState = document.getElementById('emptyState');
    if (emptyState) emptyState.style.display = 'none';
    chatArea.style.display = 'flex';

    // Update Header
    document.getElementById('chatHeaderAvatar').src = contact.avatar;
    document.getElementById('chatHeaderName').textContent = contact.name;
    document.getElementById('chatHeaderStatus').textContent = contact.online ? 'online' : `last seen ${contact.time}`;

    // Render Messages
    const messagesContainer = document.getElementById('messagesContainer');
    messagesContainer.innerHTML = '';
    
    contact.messages.forEach(msg => {
        const msgEl = document.createElement('div');
        msgEl.className = `wa-message ${msg.type}`;
        
        const statusIcon = msg.type === 'sent' ? '<span class="wa-message-status"><i class="fas fa-check-double"></i></span>' : '';
        
        msgEl.innerHTML = `
            <div class="wa-message-content">${msg.text}</div>
            <div class="wa-message-meta">
                <span class="wa-message-time">${msg.time}</span>
                ${statusIcon}
            </div>
        `;
        messagesContainer.appendChild(msgEl);
    });
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function populateContactInfo(contact) {
    document.getElementById('infoPanelAvatar').src = contact.avatar;
    document.getElementById('infoPanelName').textContent = contact.name;
    document.getElementById('infoPanelPhone').textContent = contact.phone;
    document.getElementById('infoPanelAbout').textContent = contact.about;
    document.getElementById('infoPanelCompany').textContent = contact.company;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();
    
    if (text && activeContactId) {
        const contact = contacts.find(c => c.id === activeContactId);
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        contact.messages.push({
            id: Date.now(),
            text: text,
            time: timeString,
            type: 'sent'
        });
        
        contact.lastMessage = text;
        contact.time = timeString;
        
        input.value = '';
        renderChatArea(contact);
        renderContacts(document.getElementById('searchInput').value);
        
        setTimeout(() => {
            contact.messages.push({
                id: Date.now() + 1,
                text: "Noted, sir. We'll update you soon.",
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                type: 'received'
            });
            contact.lastMessage = "Noted, sir. We'll update you soon.";
            
            if (activeContactId === contact.id) {
                renderChatArea(contact);
            } else {
                contact.unread += 1;
            }
            renderContacts(document.getElementById('searchInput').value);
        }, 2000);
    }
}

// Close Chat Area (Mobile)
function closeChatArea() {
    const chatArea = document.getElementById('chatArea');
    chatArea.style.display = 'none';
    
    // Optionally show empty state if not on mobile, but on mobile it's hidden by CSS anyway
    if (window.innerWidth > 768) {
        document.getElementById('emptyState').style.display = 'flex';
    }
}

// Contact Info Panel Toggle
function toggleContactInfo() {
    const panel = document.getElementById('contactInfoPanel');
    panel.classList.toggle('open');
}

// DP Modal Functions
function openDpModal(id, event) {
    event.stopPropagation(); // prevent chat from selecting
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        document.getElementById('dpModalImg').src = contact.avatar;
        document.getElementById('dpBackdrop').classList.add('show');
        document.getElementById('dpModal').classList.add('show');
        
        // Update modal actions to route correctly
        const actions = document.querySelector('.wa-dp-modal-actions');
        actions.innerHTML = `
            <i class="fas fa-comment" onclick="selectContactAndCloseModal(${contact.id})"></i>
            <i class="fas fa-info-circle" onclick="viewInfoAndCloseModal(${contact.id})"></i>
        `;
    }
}

function selectContactAndCloseModal(id) {
    selectContact(id);
    closeDpModal();
}

function viewInfoAndCloseModal(id) {
    selectContact(id);
    document.getElementById('contactInfoPanel').classList.add('open');
    closeDpModal();
}

function closeDpModal() {
    document.getElementById('dpBackdrop').classList.remove('show');
    document.getElementById('dpModal').classList.remove('show');
}

// Emoji and File Upload Functions
function toggleEmojiPanel() {
    const panel = document.getElementById('emojiPanel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
    } else {
        panel.style.display = 'none';
    }
}

function insertEmoji(emoji) {
    const input = document.getElementById('messageInput');
    input.value += emoji;
    input.focus();
    // hide panel after selecting
    document.getElementById('emojiPanel').style.display = 'none';
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file && activeContactId) {
        const input = document.getElementById('messageInput');
        
        // Let's create a message with a file attachment simulation
        const contact = contacts.find(c => c.id === activeContactId);
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        contact.messages.push({
            id: Date.now(),
            text: `📎 File Attached: <strong>${file.name}</strong>`,
            time: timeString,
            type: 'sent'
        });
        
        contact.lastMessage = `📎 ${file.name}`;
        contact.time = timeString;
        
        renderChatArea(contact);
        renderContacts(document.getElementById('searchInput').value);
        
        // Auto-reply simulation for files
        setTimeout(() => {
            contact.messages.push({
                id: Date.now() + 1,
                text: "Thanks for the file! I'll review it.",
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                type: 'received'
            });
            contact.lastMessage = "Thanks for the file! I'll review it.";
            
            if (activeContactId === contact.id) {
                renderChatArea(contact);
            } else {
                contact.unread += 1;
            }
            renderContacts(document.getElementById('searchInput').value);
        }, 2000);
    }
    
    // Reset file input
    event.target.value = '';
}
