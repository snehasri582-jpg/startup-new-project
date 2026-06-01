// WhatsApp Style Chat Logic - Student Dashboard (Investor Contacts)

const contacts = [
    {
        id: 1,
        name: "Ratan Tata",
        phone: "+91 98234 56789",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        lastMessage: "Looking forward to our meeting.",
        time: "10:30 AM",
        unread: 2,
        online: true,
        company: "Tata Sons",
        about: "Chairman Emeritus. Interested in ethical and sustainable startups.",
        messages: [
            { id: 1, text: "Hello! We have reviewed your pitch deck.", time: "10:05 AM", type: "received" },
            { id: 2, text: "That's great news! Thank you.", time: "10:10 AM", type: "sent" },
            { id: 3, text: "Looking forward to our meeting.", time: "10:30 AM", type: "received" }
        ]
    },
    {
        id: 2,
        name: "Elon Musk",
        phone: "+1 555 0123 456",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        lastMessage: "Is it scalable to Mars?",
        time: "Yesterday",
        unread: 0,
        online: false,
        company: "Tesla / SpaceX",
        about: "Looking for disruptive tech and space exploration ideas.",
        messages: [
            { id: 1, text: "Here is the prototype data.", time: "Yesterday, 2:00 PM", type: "sent" },
            { id: 2, text: "Is it scalable to Mars?", time: "Yesterday, 2:30 PM", type: "received" }
        ]
    },
    {
        id: 3,
        name: "Sequoia Capital",
        phone: "+1 415 555 0198",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        lastMessage: "We'd like to invite you for Series A.",
        time: "Yesterday",
        unread: 1,
        online: true,
        company: "Sequoia",
        about: "Top-tier VC focusing on tech and AI.",
        messages: [
            { id: 1, text: "We'd like to invite you for Series A.", time: "Yesterday, 4:00 PM", type: "received" }
        ]
    },
    {
        id: 4,
        name: "Anand Mahindra",
        phone: "+91 98111 22233",
        avatar: "https://randomuser.me/api/portraits/men/68.jpg",
        lastMessage: "Great initiative for rural India.",
        time: "Tuesday",
        unread: 0,
        online: false,
        company: "Mahindra Group",
        about: "Chairman. Focus on inclusive growth.",
        messages: [
            { id: 1, text: "Great initiative for rural India.", time: "Tuesday, 11:00 AM", type: "received" }
        ]
    },
    { id: 5, name: "Y Combinator", phone: "+1 650 555 1011", avatar: "https://randomuser.me/api/portraits/men/11.jpg", lastMessage: "Send us your updated metrics.", time: "Monday", unread: 0, online: false, company: "Y Combinator", about: "Startup Accelerator.", messages: [] },
    { id: 6, name: "SoftBank Vision", phone: "+81 3 5555 1234", avatar: "https://randomuser.me/api/portraits/men/22.jpg", lastMessage: "Can we schedule a call?", time: "Monday", unread: 0, online: true, company: "SoftBank", about: "Investing in the future.", messages: [] },
    { id: 7, name: "Andreessen Horowitz", phone: "+1 415 555 9999", avatar: "https://randomuser.me/api/portraits/women/33.jpg", lastMessage: "Loved the pitch deck.", time: "Last Week", unread: 0, online: false, company: "a16z", about: "Software is eating the world.", messages: [] },
    { id: 8, name: "Tiger Global", phone: "+1 212 555 7777", avatar: "https://randomuser.me/api/portraits/men/44.jpg", lastMessage: "Let's discuss the term sheet.", time: "Last Week", unread: 0, online: false, company: "Tiger Global", about: "Global investment firm.", messages: [] },
    { id: 9, name: "Lightspeed", phone: "+1 650 555 8888", avatar: "https://randomuser.me/api/portraits/women/55.jpg", lastMessage: "We are passing on this round.", time: "Last Week", unread: 0, online: false, company: "Lightspeed Venture Partners", about: "Early stage VC.", messages: [] },
    { id: 10, name: "Accel", phone: "+1 650 555 4444", avatar: "https://randomuser.me/api/portraits/men/66.jpg", lastMessage: "Keep us updated on your progress.", time: "Last Week", unread: 0, online: true, company: "Accel", about: "Partnering with exceptional founders.", messages: [] },
    { id: 11, name: "Kalaari Capital", phone: "+91 80 5555 3333", avatar: "https://randomuser.me/api/portraits/women/77.jpg", lastMessage: "Interesting consumer app.", time: "2 weeks ago", unread: 0, online: false, company: "Kalaari", about: "Empowering visionary entrepreneurs.", messages: [] },
    { id: 12, name: "Nexus Venture", phone: "+91 22 5555 2222", avatar: "https://randomuser.me/api/portraits/men/88.jpg", lastMessage: "We need more traction data.", time: "2 weeks ago", unread: 0, online: false, company: "Nexus VP", about: "India-US venture fund.", messages: [] },
    { id: 13, name: "Blume Ventures", phone: "+91 22 5555 1111", avatar: "https://randomuser.me/api/portraits/men/99.jpg", lastMessage: "Great meeting you today.", time: "3 weeks ago", unread: 0, online: false, company: "Blume", about: "Championing founders.", messages: [] },
    { id: 14, name: "Matrix Partners", phone: "+1 617 555 0000", avatar: "https://randomuser.me/api/portraits/women/12.jpg", lastMessage: "Let's catch up next quarter.", time: "3 weeks ago", unread: 0, online: false, company: "Matrix", about: "Founders first.", messages: [] }
];

let activeContactId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderContacts();
    
    // Check if there's a contact ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const contactParam = urlParams.get('investor');
    
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
                text: "Thanks, I will review it.",
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                type: 'received'
            });
            contact.lastMessage = "Thanks, I will review it.";
            
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
