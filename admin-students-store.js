 (function () {
    const STORAGE_KEY = 'startupConnect.admin.students';

    const defaultStudents = [
        { id: 1, name: "Arjun Sharma", university: "IIT Delhi", department: "CSE", email: "arjun@example.com", phone: "+91 9876543210", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "3rd", bio: "Passionate about AI and Machine Learning. Working on intelligent diagnostic systems." },
        { id: 2, name: "Anjana Verma", university: "BITS Pilani", department: "IT", email: "anjana@example.com", phone: "+91 8876543211", status: "ACTIVE", joinedDate: "11 May 2025", field: "Information Technology", year: "4th", bio: "Full-stack developer with expertise in web and mobile applications." },
        { id: 3, name: "Vikram Singh", university: "NIT Bangalore", department: "Mechanical", email: "vikram@example.com", phone: "+91 7765432100", status: "ACTIVE", joinedDate: "11 May 2025", field: "Mechanical Engineering", year: "3rd", bio: "Robotics enthusiast focused on automation solutions for agriculture." },
        { id: 4, name: "Neha Patel", university: "MIT Pune", department: "ECE", email: "neha@example.com", phone: "+91 6654321098", status: "ACTIVE", joinedDate: "11 May 2025", field: "Electronics & Communication", year: "2nd", bio: "IoT specialist developing smart city solutions." },
        { id: 5, name: "Rohan Mehta", university: "IIT Bombay", department: "CSE", email: "rohan@example.com", phone: "+91 9999900001", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "Final", bio: "Blockchain developer working on decentralized systems." },
        { id: 6, name: "Priya Nair", university: "Anna University", department: "EEE", email: "priya@example.com", phone: "+91 9888800002", status: "ACTIVE", joinedDate: "11 May 2025", field: "Electrical Engineering", year: "3rd", bio: "Renewable energy solutions specialist." },
        { id: 7, name: "Kavya Iyer", university: "Delhi University", department: "Biotech", email: "kavya@example.com", phone: "+91 9777700003", status: "ACTIVE", joinedDate: "11 May 2025", field: "Biotechnology", year: "2nd", bio: "Biotech researcher focused on sustainable solutions." },
        { id: 8, name: "Sameer Khan", university: "VIT Vellore", department: "Civil", email: "sameer@example.com", phone: "+91 9666600004", status: "ACTIVE", joinedDate: "11 May 2025", field: "Civil Engineering", year: "3rd", bio: "Infrastructure and construction tech innovator." },
        { id: 9, name: "Amrita Singh", university: "IIT Delhi", department: "CSE", email: "amrita@example.com", phone: "+91 9555500005", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "2nd", bio: "AI/ML researcher working on healthcare applications." },
        { id: 10, name: "Usha Gupta", university: "Jadavpur University", department: "IT", email: "usha@example.com", phone: "+91 9444400006", status: "ACTIVE", joinedDate: "11 May 2025", field: "Information Technology", year: "Final", bio: "Fintech developer building payment solutions." }
    ];

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function normalizeStudent(student) {
        return {
            id: Number(student.id),
            name: student.name || '',
            university: student.university || '',
            department: student.department || student.field || student.university || '',
            email: student.email || '',
            phone: student.phone || '',
            status: student.status || 'ACTIVE',
            joinedDate: student.joinedDate || '',
            field: student.field || student.department || '',
            year: student.year || '',
            bio: student.bio || ''
        };
    }

    function saveAll(students) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students.map(normalizeStudent)));
    }

    function getAll() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const students = JSON.parse(saved);
                if (Array.isArray(students)) {
                    return students.map(normalizeStudent);
                }
            }
        } catch (error) {
            console.warn('Unable to load saved students.', error);
        }

        const students = clone(defaultStudents);
        saveAll(students);
        return students;
    }

    function findById(id) {
        const studentId = Number(id);
        return getAll().find(student => student.id === studentId) || null;
    }

    function update(id, updates) {
        const studentId = Number(id);
        const students = getAll();
        const index = students.findIndex(student => student.id === studentId);

        if (index === -1) {
            return null;
        }

        students[index] = normalizeStudent({ ...students[index], ...updates, id: studentId });
        saveAll(students);
        return students[index];
    }

    function remove(id) {
        const studentId = Number(id);
        const students = getAll().filter(student => student.id !== studentId);
        saveAll(students);
        return students;
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

    function promptForStudentUpdates(student) {
        const fields = [
            ['name', 'Name'],
            ['university', 'University'],
            ['department', 'Department'],
            ['field', 'Field of Study'],
            ['year', 'Year'],
            ['phone', 'Phone'],
            ['email', 'Email'],
            ['joinedDate', 'Joined Date'],
            ['bio', 'Bio']
        ];

        return fields.reduce((updates, [key, label]) => {
            if (updates === null) {
                return null;
            }

            const currentValue = student[key] || '';
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

    function add(student) {
        const students = getAll();
        const maxId = students.reduce((max, s) => s.id > max ? s.id : max, 0);
        const newStudent = normalizeStudent({
            ...student,
            id: maxId + 1,
            joinedDate: student.joinedDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        });
        students.push(newStudent);
        saveAll(students);
        return newStudent;
    }

    function promptForNewStudent() {
        const name = prompt("Enter Student's Full Name:");
        if (!name) return null;
        
        const email = prompt("Enter Email Address:");
        if (!email) return null;
        
        const department = prompt("Enter Department (e.g. CSE, IT, Mechanical):", "CSE");
        if (!department) return null;
        
        const phone = prompt("Enter Phone Number:", "+91 ");
        if (!phone) return null;
        
        const university = prompt("Enter University:", "IIT Delhi");
        if (!university) return null;
        
        const year = prompt("Enter Year of Study (e.g., 1st, 2nd, 3rd, Final):", "3rd");
        if (!year) return null;
        
        const bio = prompt("Enter brief Student Bio:");
        
        return {
            name: name.trim(),
            email: email.trim(),
            department: department.trim(),
            phone: phone.trim(),
            university: university.trim(),
            field: department.trim(),
            year: year.trim(),
            bio: bio ? bio.trim() : '',
            status: 'ACTIVE'
        };
    }

    window.AdminStudentStore = {
        escapeHtml,
        findById,
        getAll,
        promptForStudentUpdates,
        remove,
        saveAll,
        statusClass,
        update,
        add,
        promptForNewStudent
    };
})();
