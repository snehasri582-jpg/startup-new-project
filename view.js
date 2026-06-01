// ==================== LOGOUT FUNCTION ==================== //

function handleLogout() {
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "index.html";
  }
}

const projects = [
  {
    id: 1, title: "KisanDrone", category: "Sustainability",
    description: "Autonomous drone system for precision agriculture, crop scouting, and targeted pesticide spraying.",
    keyFeatures: "AI crop analysis, 4K camera, automated flight paths, payload capacity of 10kg.",
    solution: "Reduces pesticide waste by 40% and increases yield for Indian farmers.",
    estimatedTimeline: "9 months to beta test", projectStage: "Prototype Stage",
    purposeOfFunds: "Procuring hardware components and field testing in rural Maharashtra.",
    spendingCategory: "Research & Development", demoLink: "https://kisandrone.in/demo",
    funding: "₹25,00,000", investments: 14, comments: 23, postedDaysAgo: 1, trending: true,
    student: { name: "Aarav Sharma", age: 22, university: "IIT Bombay", bio: "AgriTech Innovator", skills: "Robotics, AI, Python" },
    image: "https://picsum.photos/seed/kisan/300/200"
  },
  {
    id: 2, title: "UPI PayPulse", category: "Fintech",
    description: "Voice-based UPI payment system for visually impaired and elderly users using regional Indian languages.",
    keyFeatures: "Voice biometric authentication, support for 12 Indian languages, offline mode.",
    solution: "Bridges the digital divide by making digital payments accessible to non-tech savvy users.",
    estimatedTimeline: "6 months", projectStage: "Idea Stage",
    purposeOfFunds: "Hiring NLP engineers and UI/UX design.",
    spendingCategory: "Software Development", demoLink: "",
    funding: "₹15,00,000", investments: 21, comments: 45, postedDaysAgo: 2, trending: true,
    student: { name: "Sneha Reddy", age: 21, university: "NIT Warangal", bio: "Fintech enthusiast", skills: "NLP, Voice AI, Node.js" },
    image: "https://picsum.photos/seed/upi/300/200"
  },
  {
    id: 3, title: "Swasthya Kiosk", category: "Health",
    description: "Low-cost telemedicine kiosks to be installed in remote Indian villages for instant doctor consultations.",
    keyFeatures: "Built-in vitals scanner (BP, Sugar), Video call integration, solar-powered.",
    solution: "Provides primary healthcare access to villages with no resident doctors.",
    estimatedTimeline: "12 months to deploy 10 kiosks", projectStage: "Prototype Stage",
    purposeOfFunds: "Manufacturing kiosks and setting up a doctor network.",
    spendingCategory: "Infrastructure", demoLink: "https://swasthya-kiosk.in/demo",
    funding: "₹50,00,000", investments: 8, comments: 12, postedDaysAgo: 3, trending: false,
    student: { name: "Rohan Patel", age: 23, university: "BITS Pilani", bio: "HealthTech Maker", skills: "IoT, Healthcare Admin" },
    image: "https://picsum.photos/seed/health/300/200"
  },
  {
    id: 4, title: "EcoWeave", category: "Sustainability",
    description: "Biodegradable packaging material made from banana plant waste and agricultural stubble.",
    keyFeatures: "100% compostable, water-resistant, cheaper than standard bioplastics.",
    solution: "Reduces agricultural stubble burning and plastic pollution simultaneously.",
    estimatedTimeline: "1 year for mass production", projectStage: "Prototype Stage",
    purposeOfFunds: "Setting up a pilot manufacturing plant in Punjab.",
    spendingCategory: "Manufacturing", demoLink: "",
    funding: "₹35,00,000", investments: 12, comments: 19, postedDaysAgo: 4, trending: false,
    student: { name: "Priya Singh", age: 24, university: "IIT Delhi", bio: "Material Scientist", skills: "Chemical Engg, Sustainability" },
    image: "https://picsum.photos/seed/eco/300/200"
  },
  {
    id: 5, title: "VidyaConnect", category: "EdTech",
    description: "Peer-to-peer tutoring platform connecting college students with vernacular medium school students.",
    keyFeatures: "Vernacular language matching, progress tracking, gamified learning.",
    solution: "Provides high-quality personalized tutoring to students who cannot afford premium EdTech.",
    estimatedTimeline: "3 months to MVP", projectStage: "Idea Stage",
    purposeOfFunds: "App development and marketing in tier-3 cities.",
    spendingCategory: "Marketing & Dev", demoLink: "",
    funding: "₹10,00,000", investments: 5, comments: 8, postedDaysAgo: 5, trending: false,
    student: { name: "Arjun Verma", age: 20, university: "VIT Vellore", bio: "EdTech Developer", skills: "React Native, Firebase" },
    image: "https://picsum.photos/seed/vidya/300/200"
  },
  {
    id: 6, title: "SafeRide EV", category: "Tech",
    description: "Retrofit kits to convert existing petrol scooters into smart, affordable electric scooters.",
    keyFeatures: "Plug-and-play battery, IoT GPS tracking, 80km range.",
    solution: "Makes EV transition affordable for delivery executives and daily commuters.",
    estimatedTimeline: "6 months for ARAI approval", projectStage: "Prototype Stage",
    purposeOfFunds: "Certification and safety testing.",
    spendingCategory: "Legal & Compliance", demoLink: "https://saferide.in/demo",
    funding: "₹40,00,000", investments: 32, comments: 55, postedDaysAgo: 1, trending: true,
    student: { name: "Karthik Iyer", age: 22, university: "IIT Madras", bio: "EV Enthusiast", skills: "Automobile Engg, Embedded C" },
    image: "https://picsum.photos/seed/ev/300/200"
  },
  {
    id: 7, title: "Neer Purifier", category: "Sustainability",
    description: "Gravity-based, non-electric water purifier utilizing nano-clay technology for heavy metal removal.",
    keyFeatures: "Zero electricity required, removes arsenic and fluoride, lasts 2 years.",
    solution: "Provides clean drinking water in areas with poor power grids and contaminated groundwater.",
    estimatedTimeline: "4 months to launch", projectStage: "Prototype Stage",
    purposeOfFunds: "Inventory production and distribution logistics.",
    spendingCategory: "Production", demoLink: "",
    funding: "₹18,00,000", investments: 9, comments: 14, postedDaysAgo: 6, trending: false,
    student: { name: "Meera Das", age: 25, university: "IISc Bangalore", bio: "Water Tech Researcher", skills: "Nanotechnology" },
    image: "https://picsum.photos/seed/neer/300/200"
  },
  {
    id: 8, title: "VyaparMate", category: "Fintech",
    description: "AI-driven inventory and micro-lending app for Kirana (local grocery) stores.",
    keyFeatures: "Auto-stock predictions, WhatsApp invoice sharing, instant credit line based on sales.",
    solution: "Digitizes unorganized retail and provides credit access without traditional collateral.",
    estimatedTimeline: "Live in beta", projectStage: "Beta Stage",
    purposeOfFunds: "Expanding user base in Gujarat and Maharashtra.",
    spendingCategory: "Marketing & Operations", demoLink: "https://vyaparmate.in",
    funding: "₹60,00,000", investments: 18, comments: 29, postedDaysAgo: 2, trending: true,
    student: { name: "Rahul Shah", age: 22, university: "IIM Ahmedabad", bio: "Fintech Strategist", skills: "Business Dev, Python" },
    image: "https://picsum.photos/seed/vyapar/300/200"
  },
  {
    id: 9, title: "NariCare", category: "Health",
    description: "A discreet, AI-powered women's health tracking app integrated with affordable smart sanitary pads.",
    keyFeatures: "Menstrual health tracking, anomaly detection, community forum.",
    solution: "Breaks taboos and helps early detection of PCOS and other gynecological issues.",
    estimatedTimeline: "8 months to prototype", projectStage: "Idea Stage",
    purposeOfFunds: "R&D for the smart pad sensors and app development.",
    spendingCategory: "Research & Development", demoLink: "",
    funding: "₹30,00,000", investments: 15, comments: 40, postedDaysAgo: 7, trending: false,
    student: { name: "Ananya Kapoor", age: 21, university: "Delhi University", bio: "FemTech Founder", skills: "UI/UX, Product Strategy" },
    image: "https://picsum.photos/seed/nari/300/200"
  },
  {
    id: 10, title: "SmartMandi", category: "E-commerce",
    description: "B2B marketplace directly connecting farmers to urban restaurants, bypassing middlemen.",
    keyFeatures: "Dynamic pricing algorithm, cold-chain logistics integration, bulk bidding.",
    solution: "Increases farmer margins by 30% and reduces food cost for restaurants.",
    estimatedTimeline: "Operating in 2 cities", projectStage: "Growth Stage",
    purposeOfFunds: "Scaling logistics and expanding to 5 new cities.",
    spendingCategory: "Logistics & Expansion", demoLink: "https://smartmandi.com",
    funding: "₹1,00,00,000", investments: 25, comments: 35, postedDaysAgo: 3, trending: true,
    student: { name: "Vikram Singh", age: 24, university: "IIT Kanpur", bio: "Agri-Supply Chain Expert", skills: "Operations, Node.js" },
    image: "https://picsum.photos/seed/mandi/300/200"
  },
  {
    id: 11, title: "Vaidya AI", category: "Health",
    description: "AI-based symptom checker trained specifically on Indian medical data and regional diseases.",
    keyFeatures: "Local disease modeling (Dengue, Malaria), 10 languages, connects to local labs.",
    solution: "Provides highly accurate initial diagnosis to prevent overcrowding in clinics.",
    estimatedTimeline: "1 year", projectStage: "Idea Stage",
    purposeOfFunds: "Data collection and training AI models with hospital partnerships.",
    spendingCategory: "Data Acquisition & Cloud", demoLink: "",
    funding: "₹22,00,000", investments: 7, comments: 11, postedDaysAgo: 8, trending: false,
    student: { name: "Siddharth Bose", age: 23, university: "Jadavpur University", bio: "AI Researcher", skills: "Machine Learning, Python" },
    image: "https://picsum.photos/seed/vaidya/300/200"
  },
  {
    id: 12, title: "DesiCrafts", category: "E-commerce",
    description: "Global marketplace exclusively for authenticated Indian rural artisans and handloom weavers.",
    keyFeatures: "Artisan verification, AR try-on for handloom sarees, fair trade pricing.",
    solution: "Eliminates exploitative middlemen and gives artisans global market access.",
    estimatedTimeline: "Live with 500 artisans", projectStage: "Growth Stage",
    purposeOfFunds: "International marketing and onboarding more clusters.",
    spendingCategory: "Marketing", demoLink: "https://desicrafts.in",
    funding: "₹45,00,000", investments: 11, comments: 22, postedDaysAgo: 4, trending: false,
    student: { name: "Neha Gupta", age: 22, university: "NIFT Delhi", bio: "Fashion Tech Innovator", skills: "Design, Marketing" },
    image: "https://picsum.photos/seed/craft/300/200"
  },
  {
    id: 13, title: "UrjaGrid", category: "Sustainability",
    description: "Micro-grid management software allowing neighborhoods to trade excess rooftop solar power.",
    keyFeatures: "Blockchain ledger, IoT smart meters, real-time pricing.",
    solution: "Decentralizes power distribution and monetizes residential solar power.",
    estimatedTimeline: "Regulatory sandbox testing", projectStage: "Prototype Stage",
    purposeOfFunds: "Software security auditing and pilot deployment in a gated community.",
    spendingCategory: "Software & Hardware Pilot", demoLink: "",
    funding: "₹75,00,000", investments: 19, comments: 31, postedDaysAgo: 5, trending: true,
    student: { name: "Amitabh Nair", age: 24, university: "NIT Trichy", bio: "Clean Energy Hacker", skills: "Blockchain, IoT" },
    image: "https://picsum.photos/seed/urja/300/200"
  },
  {
    id: 14, title: "BhashaCoder", category: "EdTech",
    description: "Coding platform that teaches programming languages (Python, Java) entirely in Hindi and Tamil.",
    keyFeatures: "Vernacular IDE, translated syntax guides, community mentorship.",
    solution: "Removes English proficiency as a barrier to learning software engineering.",
    estimatedTimeline: "6 months to launch Tamil version", projectStage: "Beta Stage",
    purposeOfFunds: "Content creation and translation efforts.",
    spendingCategory: "Content Development", demoLink: "https://bhashacoder.com/beta",
    funding: "₹12,00,000", investments: 6, comments: 18, postedDaysAgo: 6, trending: false,
    student: { name: "Lakshmi Narayanan", age: 20, university: "Anna University", bio: "EdTech Visionary", skills: "Web Dev, Translation" },
    image: "https://picsum.photos/seed/bhasha/300/200"
  },
  {
    id: 15, title: "Raksha Wearables", category: "Tech",
    description: "Smart jewelry designed for women's safety with one-tap SOS and live location sharing.",
    keyFeatures: "Hidden panic button, audio recording, 1-year battery life, stylish design.",
    solution: "Provides a discreet, always-accessible safety device without looking like a gadget.",
    estimatedTimeline: "Ready for manufacturing", projectStage: "Prototype Stage",
    purposeOfFunds: "First batch manufacturing of 5,000 units.",
    spendingCategory: "Hardware Manufacturing", demoLink: "https://raksha.co.in",
    funding: "₹38,00,000", investments: 28, comments: 60, postedDaysAgo: 2, trending: true,
    student: { name: "Aditi Sharma", age: 23, university: "NID Ahmedabad", bio: "Product Designer", skills: "Industrial Design, IoT" },
    image: "https://picsum.photos/seed/raksha/300/200"
  }
];

let currentFilter = "All";

const ideaList = document.getElementById("ideaList");

/* RENDER PROJECTS */
function renderProjects(list) {
  ideaList.innerHTML = "";
  if (list.length === 0) {
    ideaList.innerHTML = '<p style="text-align: center; padding: 40px; color: #999;">No projects found</p>';
    return;
  }
  list.forEach(p => {
    ideaList.innerHTML += createProjectCard(p);
  });
}

function createProjectCard(p) {
  const trendingBadge = p.trending ? `<span class="trending-badge">🔥 Trending</span>` : "";
  const modalAction = `openModal(${JSON.stringify(p).replace(/'/g, "&apos;")})`;
  
  return `
  <div class="project-card">
    <div class="card-left">
      <div class="card-header">
        <h2 class="card-title">${p.title}</h2>
        ${trendingBadge}
      </div>
      
      <div class="card-creator" style="cursor: pointer; transition: transform 0.2s;" onclick='${modalAction}' onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
        <div class="creator-avatar" style="overflow: hidden; padding: 0; border: none; background: transparent;"><img src="https://ui-avatars.com/api/?name=${encodeURIComponent(p.student.name)}&background=ff6a00&color=fff&size=150" alt="${p.student.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;"></div>
        <div class="creator-info">
          <div class="creator-name" style="color: #ff6a00; font-weight: 700;">${p.student.name} <span style="font-size: 11px; font-weight: normal; color: #888;">(Click to view details)</span></div>
          <div class="creator-university">🎓 ${p.student.university}</div>
        </div>
      </div>
      
      <p class="card-description">${p.description}</p>
      
      <div class="card-funding">Funding Requested: ${p.funding}</div>
      
      <div class="card-meta">
        <div class="meta-item">
          <span class="meta-label">💰</span>
          <span class="meta-value">${p.investments}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">💬</span>
          <span class="meta-value">${p.comments}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">📅</span>
          <span class="meta-label">Posted ${p.postedDaysAgo} ${p.postedDaysAgo === 1 ? 'day' : 'days'} ago</span>
        </div>
      </div>
      
      <div class="card-actions" style="display: flex; gap: 10px;">
        <button class="action-btn btn-primary" style="flex: 1;" onclick='openModal(${JSON.stringify(p).replace(/'/g, "&apos;")})'>View Details</button>
        <button class="action-btn" style="flex: 1; background: #fff5e6; color: #ff6a00; border: 1px solid #ff6a00; font-weight: 600;" onclick='showInvestmentPending()'>Interested in Investment</button>
      </div>
    </div>
    
    <div class="card-right">
      <img src="${p.image}" alt="${p.title}" class="project-image"/>
    </div>
  </div>`;
}


/* FLIPKART STYLE FILTERING */
function applyFilters() {
  const catCheckboxes = document.querySelectorAll('.cat-filter:checked');
  const stageCheckboxes = document.querySelectorAll('.stage-filter:checked');
  
  const selectedCats = Array.from(catCheckboxes).map(cb => cb.value);
  const selectedStages = Array.from(stageCheckboxes).map(cb => cb.value);
  
  let filtered = projects;

  // 1. Filter by Category
  if (selectedCats.length > 0) {
    filtered = filtered.filter(p => selectedCats.includes(p.category));
  }
  
  // 2. Filter by Project Stage
  if (selectedStages.length > 0) {
    filtered = filtered.filter(p => selectedStages.includes(p.projectStage));
  }
  
  // 3. Apply Search
  const query = document.getElementById("searchInput").value.toLowerCase();
  if (query) {
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.student.name.toLowerCase().includes(query)
    );
  }

  // 4. Apply Sort
  const sortValue = document.getElementById("sortFilter").value;
  filtered = sortProjects(filtered, sortValue);

  renderProjects(filtered);
}

function sortProjects(list, sortValue) {
  let sorted = [...list];
  switch(sortValue) {
    case "trending":
      return sorted.sort((a, b) => (b.trending === true ? 1 : 0) - (a.trending === true ? 1 : 0));
    case "funding":
      return sorted.sort((a, b) => {
        const fundA = parseInt(a.funding.replace(/[^0-9]/g, '')) || 0;
        const fundB = parseInt(b.funding.replace(/[^0-9]/g, '')) || 0;
        return fundB - fundA;
      });
    case "investments":
      return sorted.sort((a, b) => b.investments - a.investments);
    default:
      return sorted.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  }
}

function clearFilters() {
  document.querySelectorAll('.cat-filter, .stage-filter').forEach(cb => cb.checked = false);
  document.getElementById("searchInput").value = "";
  document.getElementById("sortFilter").value = "recent";
  applyFilters();
}

// Attach listeners
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.cat-filter, .stage-filter').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });
  document.getElementById("searchInput").addEventListener("input", applyFilters);
  document.getElementById("sortFilter").addEventListener("change", applyFilters);
});

/* SCHEDULING */
function scheduleMeeting(p) {
  try {
    localStorage.setItem('selected_schedule_project', JSON.stringify(p));
  } catch (e) {}
  window.location.href = 'schedule.html';
}

/* MODAL */
function openModal(p) {

  // Persist full student + project details so the details page can render the same content.
  try {
    localStorage.setItem('shareidea_selected', JSON.stringify({
      project: p,
      student: p.student
    }));
  } catch (e) {
    // ignore storage errors
  }

  // Navigate to the idea details page
  window.location.href = 'shareidea-details.html';
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/* TOGGLE MENU */
function toggleMenu() {
  const nav = document.querySelector(".navbar-center");
  nav.classList.toggle("active");
}

/* INITIAL RENDER */
renderProjects(projects);

function showInvestmentPending() {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modalBody");
  modalBody.innerHTML = `
    <div style="text-align: center; padding: 30px 20px;">
      <div style="font-size: 3rem; margin-bottom: 15px;">⏳</div>
      <h2 style="color: #333; margin-bottom: 10px; font-weight: 700;">Investment Request Pending</h2>
      <p style="color: #666; font-size: 1rem; line-height: 1.5; margin-bottom: 25px;">Your interest has been successfully recorded. Please wait for the admin to review and approve your request before you can proceed further.</p>
      <div style="display: inline-block; background: #fff5e6; color: #ff6a00; padding: 8px 16px; border-radius: 20px; font-weight: 600; font-size: 0.9rem; margin-bottom: 25px;">Status: Waiting for Admin Approval</div>
      <br>
      <button onclick="closeModal()" style="background: #ff6a00; color: white; border: none; padding: 12px 30px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.2s;" onmouseover="this.style.background='#e65c00'" onmouseout="this.style.background='#ff6a00'">Okay, I understand</button>
    </div>
  `;
  modal.style.display = "flex";
}

