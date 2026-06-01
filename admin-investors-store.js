 (function () {
    const STORAGE_KEY = 'startupConnect.admin.investors';

    const defaultInvestors = [
        { id: 1, name: "Kunal Bahl", firm: "Titan Capital", focusArea: "Consumer Tech & SaaS", phone: "", email: "", status: "ACTIVE", registeredDate: "10 May 2025", investmentSize: "Seed to Series A", portfolio: "200+", bio: "Co-founder of Snapdeal & Titan Capital. Active angel investor backing 200+ startups across D2C, SaaS, and consumer tech.", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Kunal_Bahl_-_Kolkata_2015-05-21_0695.JPG" },
        { id: 2, name: "Anupam Mittal", firm: "People Group & Shaadi.com", focusArea: "D2C, Consumer & HealthTech", phone: "", email: "", status: "ACTIVE", registeredDate: "10 May 2025", investmentSize: "Seed & Early Stage", portfolio: "150+", bio: "Founder & CEO of People Group & Shaadi.com. Shark on Shark Tank India. Prominent angel backing consumer internet, health, and clean energy startups.", avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face" },
        { id: 3, name: "Peyush Bansal", firm: "Lenskart", focusArea: "Deep Tech & Consumer Brands", phone: "", email: "", status: "ACTIVE", registeredDate: "10 May 2025", investmentSize: "Seed to Early Growth", portfolio: "80+", bio: "Co-founder & CEO of Lenskart. Shark on Shark Tank India. Backs engineering-driven innovations, hardware, and tech-enabled consumer brands.", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/d/de/Piyush_Bansal_of_Lenskart239_%28cropped%29.JPG" },
        { id: 4, name: "Vineeta Singh", firm: "SUGAR Cosmetics", focusArea: "D2C & BeautyTech", phone: "", email: "", status: "ACTIVE", registeredDate: "10 May 2025", investmentSize: "Early Stage", portfolio: "45+", bio: "Co-founder & CEO of SUGAR Cosmetics. Shark on Shark Tank India. Backs high-potential D2C startups, e-commerce networks, and lifestyle brands.", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face" },
        { id: 5, name: "Aman Gupta", firm: "boAt", focusArea: "Consumer Brands & Hardware", phone: "", email: "", status: "ACTIVE", registeredDate: "11 May 2025", investmentSize: "Seed & Early Stage", portfolio: "60+", bio: "Co-founder & CMO of boAt. Shark on Shark Tank India. Passionate helper for marketing, branding, and consumer lifestyle product startups.", avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face" },
        { id: 6, name: "Namita Thapar", firm: "Emcure Pharmaceuticals", focusArea: "Healthcare & BioTech", phone: "", email: "", status: "ACTIVE", registeredDate: "11 May 2025", investmentSize: "Seed to Series B", portfolio: "50+", bio: "Executive Director of Emcure Pharmaceuticals. Shark on Shark Tank India. Focuses on healthcare innovation, pharmaceuticals, bio-tech, and wellness.", avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
        { id: 7, name: "Ritesh Agarwal", firm: "OYO Rooms", focusArea: "Travel, PropTech & D2C", phone: "", email: "", status: "ACTIVE", registeredDate: "11 May 2025", investmentSize: "Angel & Early Stage", portfolio: "30+", bio: "Founder & Group CEO of OYO Rooms. Youngest self-made billionaire angel investor in India, supporting hospitality, real estate tech, and D2C brands.", avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
        { id: 8, name: "Rajesh Magow", firm: "MakeMyTrip", focusArea: "TravelTech & Consumer Internet", phone: "", email: "", status: "ACTIVE", registeredDate: "11 May 2025", investmentSize: "Early Stage", portfolio: "25+", bio: "Co-Founder & Group CEO of MakeMyTrip. Focuses on tech platforms in consumer internet, logistics, travel tech, and service market platforms.", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
        { id: 9, name: "Vijay Shekhar Sharma", firm: "Paytm", focusArea: "Fintech & Mobile Platforms", phone: "", email: "", status: "ACTIVE", registeredDate: "12 May 2025", investmentSize: "Seed & Growth", portfolio: "75+", bio: "Founder & CEO of Paytm. Pioneer of mobile payments in India. Actively supports fintech innovations, blockchain tech, and cloud architectures.", avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Vijay_Shekhar_Sharma_%282019%29.jpg" },
        { id: 10, name: "Kunal Shah", firm: "CRED", focusArea: "Fintech & Consumer Internet", phone: "", email: "", status: "ACTIVE", registeredDate: "12 May 2025", investmentSize: "Early Stage", portfolio: "180+", bio: "Founder of CRED & Freecharge. Leading Indian angel investor, backing consumer tech, fintech, Web3, and growth platforms across Asia.", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
    ];

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function normalizeInvestor(investor) {
        return {
            id: Number(investor.id),
            name: investor.name || '',
            firm: investor.firm || investor.company || '',
            focusArea: investor.focusArea || investor.focus || '',
            phone: investor.phone || '',
            email: investor.email || '',
            status: investor.status || 'ACTIVE',
            registeredDate: investor.registeredDate || '',
            investmentSize: investor.investmentSize || '',
            portfolio: investor.portfolio || '',
            bio: investor.bio || '',
            avatarUrl: investor.avatarUrl || ''
        };
    }

    function saveAll(investors) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(investors.map(normalizeInvestor)));
    }

    function getAll() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const investors = JSON.parse(saved);
                if (Array.isArray(investors) && investors.length > 0 && investors.some(i => i.name.toLowerCase().includes("kunal bahl") && i.avatarUrl !== undefined)) {
                    return investors.map(normalizeInvestor);
                }
            }
        } catch (error) {
            console.warn('Unable to load saved investors.', error);
        }

        const investors = clone(defaultInvestors);
        saveAll(investors);
        return investors;
    }

    function findById(id) {
        const investorId = Number(id);
        return getAll().find(investor => investor.id === investorId) || null;
    }

    function update(id, updates) {
        const investorId = Number(id);
        const investors = getAll();
        const index = investors.findIndex(investor => investor.id === investorId);

        if (index === -1) {
            return null;
        }

        investors[index] = normalizeInvestor({ ...investors[index], ...updates, id: investorId });
        saveAll(investors);
        return investors[index];
    }

    function remove(id) {
        const investorId = Number(id);
        const investors = getAll().filter(investor => investor.id !== investorId);
        saveAll(investors);
        return investors;
    }

    function statusClass(status) {
        const normalized = String(status || '').toLowerCase();

        if (normalized === 'active' || normalized === 'verified' || normalized === 'approved') {
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

    function promptForInvestorUpdates(investor) {
        const fields = [
            ['name', 'Name'],
            ['firm', 'Firm / Company'],
            ['focusArea', 'Focus Area'],
            ['phone', 'Phone'],
            ['email', 'Email'],
            ['investmentSize', 'Investment Size'],
            ['portfolio', 'Portfolio'],
            ['bio', 'Bio']
        ];

        return fields.reduce((updates, [key, label]) => {
            if (updates === null) {
                return null;
            }

            const currentValue = investor[key] || '';
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

    function add(investor) {
        const investors = getAll();
        const maxId = investors.reduce((max, i) => i.id > max ? i.id : max, 0);
        const newInvestor = normalizeInvestor({
            ...investor,
            id: maxId + 1,
            registeredDate: investor.registeredDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        });
        investors.push(newInvestor);
        saveAll(investors);
        return newInvestor;
    }

    function promptForNewInvestor() {
        const name = prompt("Enter Investor's Full Name:");
        if (!name) return null;
        
        const firm = prompt("Enter Firm/Company Name:");
        if (!firm) return null;
        
        const focusArea = prompt("Enter Investment Focus Area (e.g. SaaS, DeepTech, Fintech):");
        if (!focusArea) return null;
        
        const phone = prompt("Enter Phone Number:", "+91 ");
        if (!phone) return null;
        
        const email = prompt("Enter Email Address:");
        if (!email) return null;
        
        const investmentSize = prompt("Enter Average Investment Size (e.g. Seed to Series A):", "Seed");
        if (!investmentSize) return null;
        
        const portfolio = prompt("Enter Portfolio count (e.g. 10+, 25+):", "5+");
        if (!portfolio) return null;
        
        const bio = prompt("Enter brief Investor Bio:");
        
        return {
            name: name.trim(),
            firm: firm.trim(),
            focusArea: focusArea.trim(),
            phone: phone.trim(),
            email: email.trim(),
            investmentSize: investmentSize.trim(),
            portfolio: portfolio.trim(),
            bio: bio ? bio.trim() : '',
            status: 'ACTIVE'
        };
    }

    window.AdminInvestorStore = {
        escapeHtml,
        findById,
        getAll,
        promptForInvestorUpdates,
        remove,
        saveAll,
        statusClass,
        update,
        add,
        promptForNewInvestor
    };
})();
