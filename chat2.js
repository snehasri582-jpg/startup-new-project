// ==================== LOGOUT FUNCTION ==================== //

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

const modal = document.getElementById("meetingModal");
const openBtn = document.getElementById("scheduleBtn");
const closeBtn = document.querySelector(".close");
const input = document.getElementById("msgInput");
const messages = document.querySelector(".messages");
const chatMsgInput = document.querySelector(".chat-msg-input");
const sendBtn = document.querySelector(".send-btn");
const liveChat = document.querySelector(".live-chat");

// Modal Controls
openBtn.onclick = () => modal.style.display = "block";
closeBtn.onclick = () => modal.style.display = "none";

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

// Keyword-based Auto Reply Logic
function getAutoResponse(msg) {
  const text = msg.toLowerCase();
  if (text.includes("pitch") || text.includes("deck") || text.includes("idea")) {
    return "That sounds like a great concept! Have you uploaded your pitch deck yet? I'd love to review the financials.";
  }
  if (text.includes("funding") || text.includes("money") || text.includes("investment") || text.includes("rupee")) {
    return "I am looking for projects with high scalability. What is your projected user growth for the next year?";
  }
  if (text.includes("mentor") || text.includes("help") || text.includes("guide")) {
    return "Mentorship is key! We can discuss your product-market fit during our next scheduled call.";
  }
  if (text.includes("demo") || text.includes("link") || text.includes("prototype")) {
    return "I just saw your prototype link! It looks promising. How long did it take to build this version?";
  }
  if (text.includes("hi") || text.includes("hello") || text.includes("hey") || text.includes("good morning")) {
    return "Hello! I've been looking over your profile. Ready to discuss your project?";
  }
  if (text.includes("thanks") || text.includes("thank you")) {
    return "Happy to help! Let's keep making progress.";
  }
  if (text.includes("meeting") || text.includes("schedule") || text.includes("call")) {
    return "Sure thing! Use the 'Schedule Meeting' button above to pick a time that works for you.";
  }
  return "I see. Can you elaborate more on how you plan to tackle the current market challenges with your solution?";
}

// Chat Message Sending (Main Chat)
function sendMessage() {
  const userMsg = input.value.trim();
  if (!userMsg) return;

  const row = document.createElement("div");
  row.className = "chat-row sent";

  row.innerHTML = `
    <div class="bubble">${userMsg}</div>
    <img src="https://randomuser.me/api/portraits/men/11.jpg">
  `;

  messages.appendChild(row);
  input.value = "";
  
  // Automatic Scroll
  autoScroll(messages);

  // Simulate Auto Reply after 1.5 seconds
  setTimeout(() => {
    const replyText = getAutoResponse(userMsg);
    const replyRow = document.createElement("div");
    replyRow.className = "chat-row received";
    replyRow.innerHTML = `
      <img src="https://randomuser.me/api/portraits/men/68.jpg">
      <div class="bubble">${replyText}</div>
    `;
    messages.appendChild(replyRow);
    autoScroll(messages);
  }, 1500);
}

// Helper function for smooth automatic scrolling
function autoScroll(container) {
  container.scrollTo({
    top: container.scrollHeight,
    behavior: 'smooth'
  });
}

// Live Chat Sending (Zoom Chat)
if (sendBtn) {
  sendBtn.onclick = () => {
    if (!chatMsgInput.value.trim()) return;

    const chatMsg = document.createElement("div");
    chatMsg.className = "chat-message speaker";
    chatMsg.innerHTML = `
      <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="You">
      <div class="message-content">
        <strong>You</strong>
        <p>${chatMsgInput.value}</p>
      </div>
      <span class="time">Just now</span>
    `;

    liveChat.appendChild(chatMsg);
    chatMsgInput.value = "";
    autoScroll(liveChat);
  };

  // Send message on Enter key
  chatMsgInput.onkeypress = (e) => {
    if (e.key === "Enter") {
      sendBtn.click();
    }
  };
}

// Zoom Controls
function zoomAction(action) {
  console.log(action + " clicked");
  
  switch(action) {
    case "Mute":
      alert("🎤 Mute toggled");
      break;
    case "Stop Video":
      alert("📹 Video stopped");
      break;
    case "Chat":
      alert("💬 Chat opened");
      break;
    case "Share Screen":
      alert("🖥️ Screen sharing started");
      break;
    case "Record":
      alert("⏺️ Recording started");
      break;
    default:
      alert(action);
  }
}

function endZoom() {
  if (confirm("Are you sure you want to end the meeting?")) {
    alert("📞 Zoom meeting ended");
  }
}

// Tab Switching
const tabs = document.querySelectorAll(".tab");
if (tabs.length > 0) {
  tabs.forEach(tab => {
    tab.onclick = (e) => {
      tabs.forEach(t => t.classList.remove("active"));
      e.target.classList.add("active");
    };
  });
}

// Sidebar Contact/Group Selection
const contacts = document.querySelectorAll(".contact");
contacts.forEach(contact => {
  contact.addEventListener("click", function() {
    contacts.forEach(c => c.classList.remove("active"));
    this.classList.add("active");
    const name = this.querySelector("strong").innerText;
    document.querySelector(".chat-header h3").innerText = name;
    document.querySelector(".chat-header img").src = this.querySelector("img").src;
  });
});

// WhatsApp-style File Sharing Functions
function triggerFileUpload() {
  document.getElementById('chatFile').click();
}

function sendFile() {
  const fileInput = document.getElementById('chatFile');
  if (fileInput.files.length === 0) return;
  
  const fileName = fileInput.files[0].name;
  const row = document.createElement("div");
  row.className = "chat-row sent";
  row.innerHTML = `
    <div class="bubble">📄 ${fileName}</div>
    <img src="https://randomuser.me/api/portraits/men/11.jpg">
  `;
  messages.appendChild(row);
  autoScroll(messages);
  
  // Simulated Reply for shared files
  setTimeout(() => {
    const replyRow = document.createElement("div");
    replyRow.className = "chat-row received";
    replyRow.innerHTML = `
      <img src="https://randomuser.me/api/portraits/men/68.jpg">
      <div class="bubble">I've received your document: <strong>${fileName}</strong>. I'll review it and get back to you!</div>
    `;
    messages.appendChild(replyRow);
    autoScroll(messages);
  }, 1500);
  
  fileInput.value = ""; // Reset for next upload
}

// Upload button functionality
const uploadBtn = document.querySelector(".upload-btn");
if (uploadBtn) {
  uploadBtn.onclick = () => {
    alert("File upload dialog would open here");
  };
}

// View Report buttons
const viewBtns = document.querySelectorAll(".view-btn");
viewBtns.forEach(btn => {
  btn.onclick = () => {
    alert("Opening progress report...");
  };
});

// Scroll live chat to bottom on load
window.addEventListener("load", () => {
  if (liveChat) {
    liveChat.scrollTop = liveChat.scrollHeight;
  }
});
