(function () {
    const STORAGE_KEY = 'startupConnect.admin.meetings';

    const defaultMeetings = [
        { id: 1, title: "EcoCharge Pitch Review", student: "Jayram", investor: "Rajesh Kumar", company: "Accel Partners India", date: "2026-06-15", time: "10:00 AM", status: "UPCOMING", link: "https://zoom.us/j/123", description: "First round solar battery technology review and funding negotiation." },
        { id: 2, title: "TechInnovate AI Demo", student: "Vinay Kumar", investor: "Priya Sharma", company: "Sequoia Capital", date: "2026-06-18", time: "02:00 PM", status: "PENDING", link: "https://meet.google.com/abc", description: "AI mentorship and matching tool live platform walkthrough." },
        { id: 3, title: "HealthSync Feedback Session", student: "Karthik", investor: "David Lee", company: "Impact Inv", date: "2026-05-25", time: "11:00 AM", status: "AWAITING_FOLLOWUP", link: "https://teams.com/j/456", description: "Demo feedback of remote chronic care device tracking." },
        { id: 4, title: "AgriGrow Partnership Pitch", student: "Vikram", investor: "Lisa Chen", company: "Seed Ventures", date: "2026-06-20", time: "04:00 PM", status: "UPCOMING", link: "https://meet.google.com/xyz", description: "Precision agriculture and IoT device crop scouting demo." },
        { id: 5, title: "EduConnect Seed Deck", student: "Beulah", investor: "Robert Miller", company: "Peak Partners", date: "2026-05-28", time: "09:00 AM", status: "AWAITING_FOLLOWUP", link: "https://zoom.us/j/789", description: "Underserved peer-led learning deck presentation and series-seed discussion." },
        { id: 6, title: "RoboFarm Pitch Review", student: "Akhil", investor: "Elena Rossi", company: "Milan Seed", date: "2026-06-22", time: "02:00 PM", status: "UPCOMING", link: "https://zoom.us/j/444", description: "Autonomous crop scouting robot product demonstration." },
        { id: 7, title: "BlockVote Security Review", student: "Arshad", investor: "Maria Garcia", company: "Global Growth", date: "2026-05-24", time: "03:30 PM", status: "AWAITING_FOLLOWUP", link: "https://zoom.us/j/555", description: "Discussion on security and audit report for voting app." },
        { id: 8, title: "LangConnect Matchmaking", student: "Keshavaram", investor: "Amit Khanna", company: "Angel", date: "2026-06-25", time: "01:00 PM", status: "PENDING", link: "https://teams.microsoft.com/j/666", description: "Reviewing Language Coaching matching parameters." },
        { id: 9, title: "FinPal Compliance Meeting", student: "Sree Datha", investor: "Rajesh Kumar", company: "Accel Partners India", date: "2026-06-16", time: "11:30 AM", status: "UPCOMING", link: "https://meet.google.com/def", description: "Regulatory framework discussion for financial health tool." },
        { id: 10, title: "DroneDelivery Medical Trials", student: "Teja", investor: "Priya Sharma", company: "Sequoia Capital", date: "2026-06-28", time: "04:30 PM", status: "PENDING", link: "https://meet.google.com/ghi", description: "Initial presentation on emergency supply delivery drones." }
    ];

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function normalizeMeeting(meeting) {
        return {
            id: Number(meeting.id),
            title: meeting.title || 'Meeting Request',
            student: meeting.student || '',
            investor: meeting.investor || '',
            company: meeting.company || '',
            date: meeting.date || '',
            time: meeting.time || '',
            status: meeting.status || 'PENDING',
            link: meeting.link || 'https://meet.google.com',
            description: meeting.description || 'No description provided.'
        };
    }

    function saveAll(meetings) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings.map(normalizeMeeting)));
    }

    function getAll() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const meetings = JSON.parse(saved);
                if (Array.isArray(meetings)) {
                    if (meetings.length === 5) {
                        const upgraded = clone(defaultMeetings);
                        saveAll(upgraded);
                        return upgraded;
                    }
                    return meetings.map(normalizeMeeting);
                }
            }
        } catch (error) {
            console.warn('Unable to load saved meetings.', error);
        }

        const meetings = clone(defaultMeetings);
        saveAll(meetings);
        return meetings;
    }

    function findById(id) {
        const meetingId = Number(id);
        return getAll().find(meeting => meeting.id === meetingId) || null;
    }

    function update(id, updates) {
        const meetingId = Number(id);
        const meetings = getAll();
        const index = meetings.findIndex(meeting => meeting.id === meetingId);

        if (index === -1) {
            return null;
        }

        meetings[index] = normalizeMeeting({ ...meetings[index], ...updates, id: meetingId });
        saveAll(meetings);
        return meetings[index];
    }

    function remove(id) {
        const meetingId = Number(id);
        const meetings = getAll().filter(meeting => meeting.id !== meetingId);
        saveAll(meetings);
        return meetings;
    }

    function add(meeting) {
        const meetings = getAll();
        const maxId = meetings.reduce((max, m) => m.id > max ? m.id : max, 0);
        const newMeeting = normalizeMeeting({
            ...meeting,
            id: maxId + 1
        });
        meetings.push(newMeeting);
        saveAll(meetings);
        return newMeeting;
    }

    function statusClass(status) {
        const normalized = String(status || '').toUpperCase();
        if (normalized === 'UPCOMING') return 'status-upcoming';
        if (normalized === 'AWAITING_FOLLOWUP' || normalized === 'AWAITING_FOLLOW_UP' || normalized === 'FOLLOWUP') return 'status-followup';
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

    function promptForMeetingUpdates(meeting) {
        const fields = [
            ['title', 'Meeting Title'],
            ['student', 'Student Name'],
            ['investor', 'Investor Name'],
            ['company', 'Investor Company'],
            ['date', 'Date (YYYY-MM-DD)'],
            ['time', 'Time (e.g. 10:00 AM)'],
            ['link', 'Meeting Link (Zoom/Meet)'],
            ['description', 'Short Description']
        ];

        return fields.reduce((updates, [key, label]) => {
            if (updates === null) {
                return null;
            }

            const currentValue = meeting[key] || '';
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

    function promptForNewMeeting() {
        const title = prompt("Enter Meeting Title:");
        if (!title) return null;

        const student = prompt("Enter Student Name:");
        if (!student) return null;

        const investor = prompt("Enter Investor Name:");
        if (!investor) return null;

        const company = prompt("Enter Investor Company:");
        if (!company) return null;

        const date = prompt("Enter Meeting Date (YYYY-MM-DD):", new Date().toISOString().split('T')[0]);
        if (!date) return null;

        const time = prompt("Enter Meeting Time (e.g., 10:00 AM):");
        if (!time) return null;

        const link = prompt("Enter Meeting Link (Zoom/Meet):", "https://meet.google.com");
        if (!link) return null;

        const description = prompt("Enter Meeting Description:");

        return {
            title: title.trim(),
            student: student.trim(),
            investor: investor.trim(),
            company: company.trim(),
            date: date.trim(),
            time: time.trim(),
            link: link.trim(),
            description: description ? description.trim() : '',
            status: 'PENDING'
        };
    }

    window.AdminMeetingsStore = {
        escapeHtml,
        findById,
        getAll,
        promptForMeetingUpdates,
        promptForNewMeeting,
        remove,
        saveAll,
        statusClass,
        update,
        add
    };
})();
