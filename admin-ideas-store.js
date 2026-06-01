(function () {
    const STORAGE_KEY = 'startupConnect.admin.ideas';

    const defaultIdeas = [
        { id: 1, title: "EcoCharge", student: "Jayram", category: "Sustainability", status: "PENDING", description: "Portable solar battery systems for rural microgrid communities.", stage: "Pre-Seed", applications: 18 },
        { id: 2, title: "TechInnovate", student: "Vinay Kumar", category: "SaaS", status: "APPROVED", description: "AI-driven mentorship and funding matching for early-stage founders.", stage: "Seed", applications: 26 },
        { id: 3, title: "HealthSync", student: "Karthik", category: "HealthTech", status: "PENDING", description: "Remote patient monitoring for chronic care and wellness tracking.", stage: "Seed", applications: 12 },
        { id: 4, title: "AgriGrow", student: "Vikram", category: "AgriTech", status: "PENDING", description: "Precision farming analytics for smallholder crop optimization.", stage: "Pre-Seed", applications: 14 },
        { id: 5, title: "EduConnect", student: "Beulah", category: "EdTech", status: "APPROVED", description: "Peer-led learning communities for underserved students.", stage: "Series A", applications: 34 },
        { id: 6, title: "FinPal", student: "Akhil", category: "FinTech", status: "PENDING", description: "Mobile financial health tools for first-time salaried workers.", stage: "Pre-Seed", applications: 9 },
        { id: 7, title: "RoboFarm", student: "Arshad", category: "AgriTech", status: "PENDING", description: "Autonomous crop scouting robots for productivity gains.", stage: "Seed", applications: 16 },
        { id: 8, title: "BlockVote", student: "Keshavaram", category: "Web3", status: "APPROVED", description: "Blockchain voting platform for campus governance and clubs.", stage: "Seed", applications: 11 },
        { id: 9, title: "LangConnect", student: "Sree Datha", category: "AI", status: "PENDING", description: "Language coaching app for remote internship seekers.", stage: "Pre-Seed", applications: 22 },
        { id: 10, title: "DroneDelivery", student: "Archana", category: "Robotics", status: "PENDING", description: "Emergency delivery drones for medical supplies in cities.", stage: "Seed", applications: 20 }
    ];

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function normalizeIdea(idea) {
        return {
            id: Number(idea.id),
            title: idea.title || '',
            student: idea.student || '',
            category: idea.category || '',
            status: idea.status || 'PENDING',
            description: idea.description || '',
            stage: idea.stage || 'Pre-Seed',
            applications: Number(idea.applications ?? 0)
        };
    }

    function saveAll(ideas) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas.map(normalizeIdea)));
    }

    function getAll() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const ideas = JSON.parse(saved);
                if (Array.isArray(ideas)) {
                    return ideas.map(normalizeIdea);
                }
            }
        } catch (error) {
            console.warn('Unable to load saved ideas/projects.', error);
        }

        const ideas = clone(defaultIdeas);
        saveAll(ideas);
        return ideas;
    }

    function findById(id) {
        const ideaId = Number(id);
        return getAll().find(idea => idea.id === ideaId) || null;
    }

    function update(id, updates) {
        const ideaId = Number(id);
        const ideas = getAll();
        const index = ideas.findIndex(idea => idea.id === ideaId);

        if (index === -1) {
            return null;
        }

        ideas[index] = normalizeIdea({ ...ideas[index], ...updates, id: ideaId });
        saveAll(ideas);
        return ideas[index];
    }

    function remove(id) {
        const ideaId = Number(id);
        const ideas = getAll().filter(idea => idea.id !== ideaId);
        saveAll(ideas);
        return ideas;
    }

    function statusClass(status) {
        const normalized = String(status || '').toLowerCase();

        if (normalized === 'approved' || normalized === 'active' || normalized === 'verified') {
            return 'status-verified';
        }

        if (normalized === 'rejected' || normalized === 'inactive') {
            return 'status-rejected';
        }

        return 'status-pending';
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, character => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[character]);
    }

    function promptForIdeaUpdates(idea) {
        const fields = [
            ['title', 'Project Title'],
            ['student', 'Student Name'],
            ['category', 'Category'],
            ['stage', 'Funding Stage (e.g. Pre-Seed, Seed, Series A)'],
            ['applications', 'Number of Applications'],
            ['description', 'Project Description']
        ];

        return fields.reduce((updates, [key, label]) => {
            if (updates === null) {
                return null;
            }

            const currentValue = idea[key] || '';
            const value = prompt(`Edit ${label}:`, currentValue);

            if (value === null) {
                return null;
            }

            return {
                ...updates,
                [key]: value.trim() || currentValue
            };
        }, {});
    }

    function add(idea) {
        const ideas = getAll();
        const maxId = ideas.reduce((max, i) => i.id > max ? i.id : max, 0);
        const newIdea = normalizeIdea({
            ...idea,
            id: maxId + 1
        });
        ideas.push(newIdea);
        saveAll(ideas);
        return newIdea;
    }

    function promptForNewIdea() {
        const title = prompt("Enter Project/Idea Title:");
        if (!title) return null;
        
        const student = prompt("Enter Student Name:");
        if (!student) return null;
        
        const category = prompt("Enter Category (e.g. Sustainability, SaaS, HealthTech):", "SaaS");
        if (!category) return null;
        
        const stage = prompt("Enter Development Stage (e.g., Pre-Seed, Seed, Series A):", "Pre-Seed");
        if (!stage) return null;
        
        const description = prompt("Enter short Project Description:");
        if (!description) return null;
        
        return {
            title: title.trim(),
            student: student.trim(),
            category: category.trim(),
            stage: stage.trim(),
            description: description.trim(),
            applications: 0,
            status: 'PENDING'
        };
    }

    window.AdminIdeasStore = {
        escapeHtml,
        findById,
        getAll,
        promptForIdeaUpdates,
        remove,
        saveAll,
        statusClass,
        update,
        add,
        promptForNewIdea
    };
})();
