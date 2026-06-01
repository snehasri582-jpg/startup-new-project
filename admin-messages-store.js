// admin-messages-store.js
(function () {
    const STORAGE_KEY = 'startupConnect.admin.messages';
    function clone(value) { return JSON.parse(JSON.stringify(value)); }
    function normalizeMessage(msg) {
        return {
            id: Number(msg.id),
            name: msg.name || '',
            email: msg.email || '',
            phone: msg.phone || '',
            subject: msg.subject || '',
            message: msg.message || '',
            channel: msg.channel || 'Email', // Email, Call, Chat
            date: msg.date || new Date().toISOString(),
            status: msg.status || 'Open'
        };
    }
    // Utility to escape HTML for safe display
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    function getAll() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const arr = JSON.parse(saved);
                if (Array.isArray(arr) && arr.length) return arr.map(normalizeMessage);
            }
        } catch (e) { console.warn('Load messages error', e); }
        // No stored data – seed with sample messages
        const sampleMessages = [
            // Student messages
            { id: 1, name: 'Student A', email: 'studenta@example.in', phone: '+91 98111 22233', subject: 'Meeting Issue', message: 'Having trouble joining Zoom meeting.', channel: 'Email', date: new Date().toISOString() },
            { id: 2, name: 'Student B', email: 'studentb@example.in', phone: '+91 98222 33344', subject: 'Zoom Schedule', message: 'Can we reschedule the Zoom call?', channel: 'Call', date: new Date().toISOString() },
            { id: 3, name: 'Student C', email: 'studentc@example.in', phone: '+91 98333 44455', subject: 'Negotiation', message: 'Need to negotiate project scope.', channel: 'Chat', date: new Date().toISOString() },
            { id: 4, name: 'Student D', email: 'studentd@example.in', phone: '+91 98444 55566', subject: 'Meeting Follow-up', message: 'Follow up on yesterday’s meeting.', channel: 'Email', date: new Date().toISOString() },
            { id: 5, name: 'Student E', email: 'studente@example.in', phone: '+91 98555 66677', subject: 'Zoom Issues', message: 'Zoom keeps dropping connection.', channel: 'Call', date: new Date().toISOString() },
            // Investor messages
            { id: 6, name: 'Investor X', email: 'investorx@example.in', phone: '+91 99111 22233', subject: 'Meeting Request', message: 'Requesting a meeting to discuss investment.', channel: 'Email', date: new Date().toISOString() },
            { id: 7, name: 'Investor Y', email: 'investory@example.in', phone: '+91 99222 33344', subject: 'Zoom Link', message: 'Please send Zoom link for our call.', channel: 'Chat', date: new Date().toISOString() },
            { id: 8, name: 'Investor Z', email: 'investorz@example.in', phone: '+91 99333 44455', subject: 'Negotiation', message: 'Ready to negotiate terms.', channel: 'Call', date: new Date().toISOString() },
            { id: 9, name: 'Investor W', email: 'investorw@example.in', phone: '+91 99444 55566', subject: 'Meeting Follow-up', message: 'Following up on our meeting.', channel: 'Email', date: new Date().toISOString() },
            { id: 10, name: 'Investor V', email: 'investorv@example.in', phone: '+91 99555 66677', subject: 'Zoom Troubles', message: 'Zoom audio not working.', channel: 'Chat', date: new Date().toISOString() }
        ];
        saveAll(sampleMessages);
        return sampleMessages;
    }
    function saveAll(messages) { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.map(normalizeMessage))); }
    function add(msg) {
        const msgs = getAll();
        const maxId = msgs.reduce((m, i) => i.id > m ? i.id : m, 0);
        const newMsg = normalizeMessage({ ...msg, id: maxId + 1, date: new Date().toISOString() });
        msgs.push(newMsg);
        saveAll(msgs);
        return newMsg;
    }
    function remove(id) {
        const msgs = getAll().filter(m => m.id !== Number(id));
        saveAll(msgs);
        return msgs;
    }
    function findById(id) { return getAll().find(m => m.id === Number(id)) || null; }
    function promptForMessageUpdates(message) {
        const fields = [
            ['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['subject', 'Subject'], ['message', 'Message'], ['channel', 'Channel (Email/Call/Chat)']
        ];
        return fields.reduce((updates, [key, label]) => {
            if (updates === null) return null;
            const cur = message[key] || '';
            const val = prompt(`Edit ${label}:`, cur);
            if (val === null) return null;
            return { ...updates, [key]: val.trim() || cur };
        }, {});
    }
    function update(id, updates) {
        const msgs = getAll();
        const idx = msgs.findIndex(m => m.id === Number(id));
        if (idx === -1) return null;
        msgs[idx] = normalizeMessage({ ...msgs[idx], ...updates, id: Number(id) });
        saveAll(msgs);
        return msgs[idx];
    }
    window.AdminMessageStore = { getAll, add, remove, findById, update, promptForMessageUpdates, escapeHtml };
})();
