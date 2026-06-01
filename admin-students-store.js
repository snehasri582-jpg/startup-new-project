 (function () {
    const STORAGE_KEY = 'startupConnect.admin.students';

    const defaultStudents = [
        { id: 1, name: "Yamini", university: "IIT Delhi", department: "CSE", email: "yamini@example.com", phone: "+91 9876543210", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "3rd", bio: "Passionate about AI and Machine Learning." },
        { id: 2, name: "Meena", university: "BITS Pilani", department: "IT", email: "meena@example.com", phone: "+91 8876543211", status: "ACTIVE", joinedDate: "11 May 2025", field: "Information Technology", year: "4th", bio: "Full-stack developer." },
        { id: 3, name: "Karthik", university: "NIT Bangalore", department: "CSE", email: "karthik@example.com", phone: "+91 7765432100", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "3rd", bio: "Robotics and AI enthusiast." },
        { id: 4, name: "Kalyani", university: "MIT Pune", department: "ECE", email: "kalyani@example.com", phone: "+91 6654321098", status: "ACTIVE", joinedDate: "11 May 2025", field: "Electronics & Communication", year: "2nd", bio: "IoT specialist." },
        { id: 5, name: "Shive", university: "IIT Bombay", department: "CSE", email: "shive@example.com", phone: "+91 9999900001", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "Final", bio: "Blockchain developer." },
        { id: 6, name: "Shanmukh", university: "Anna University", department: "EEE", email: "shanmukh@example.com", phone: "+91 9888800002", status: "ACTIVE", joinedDate: "11 May 2025", field: "Electrical Engineering", year: "3rd", bio: "Renewable energy specialist." },
        { id: 7, name: "Srinath", university: "IIT Madras", department: "Robotics", email: "srinath@example.com", phone: "+91 9777700003", status: "ACTIVE", joinedDate: "11 May 2025", field: "Robotics", year: "2nd", bio: "Drones and automation." },
        { id: 8, name: "Naveen", university: "Anna University", department: "IoT", email: "naveen@example.com", phone: "+91 9666600004", status: "ACTIVE", joinedDate: "11 May 2025", field: "IoT", year: "3rd", bio: "AgriTech innovator." },
        { id: 9, name: "Sudharshan", university: "AMU", department: "CSE", email: "sudharshan@example.com", phone: "+91 9555500005", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "2nd", bio: "NLP and healthcare ML." },
        { id: 10, name: "Harsha", university: "Jadavpur University", department: "IT", email: "harsha@example.com", phone: "+91 9444400006", status: "ACTIVE", joinedDate: "11 May 2025", field: "Information Technology", year: "Final", bio: "Fintech developer." },
        { id: 11, name: "Jayram", university: "IIT Roorkee", department: "CSE", email: "jayram@example.com", phone: "+91 9123456789", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "3rd", bio: "Product and growth." },
        { id: 12, name: "Vinay Kumar", university: "BITS Pilani", department: "ME", email: "vinay.kumar@example.com", phone: "+91 9012345678", status: "ACTIVE", joinedDate: "11 May 2025", field: "Mechanical Engineering", year: "4th", bio: "Hardware and systems." },
        { id: 13, name: "Vikram", university: "IISc Bangalore", department: "Aero", email: "vikram@example.com", phone: "+91 9023456789", status: "ACTIVE", joinedDate: "11 May 2025", field: "Robotics", year: "2nd", bio: "Autonomous systems." },
        { id: 14, name: "Beulah", university: "Christ University", department: "Design", email: "beulah@example.com", phone: "+91 9034567890", status: "ACTIVE", joinedDate: "11 May 2025", field: "Design", year: "3rd", bio: "UX & product design." },
        { id: 15, name: "Akhil", university: "IIT Guwahati", department: "CSE", email: "akhil@example.com", phone: "+91 9045678901", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "Final", bio: "Mobile & cloud developer." },
        { id: 16, name: "Arshad", university: "Jamia Millia Islamia", department: "Agri", email: "arshad@example.com", phone: "+91 9056789012", status: "ACTIVE", joinedDate: "11 May 2025", field: "AgriTech", year: "3rd", bio: "Agri automation." },
        { id: 17, name: "Keshavaram", university: "NIT Trichy", department: "CSE", email: "keshavaram@example.com", phone: "+91 9067890123", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "2nd", bio: "Distributed systems." },
        { id: 18, name: "Sree Datha", university: "IIT Hyderabad", department: "AI", email: "sree.datha@example.com", phone: "+91 9078901234", status: "ACTIVE", joinedDate: "11 May 2025", field: "Artificial Intelligence", year: "3rd", bio: "Language technologies." },
        { id: 19, name: "Archana", university: "IIT Kharagpur", department: "Design", email: "archana@example.com", phone: "+91 9089012345", status: "ACTIVE", joinedDate: "11 May 2025", field: "Design", year: "4th", bio: "Product & visual design." },
        { id: 20, name: "Teja", university: "NIT Warangal", department: "ECE", email: "teja@example.com", phone: "+91 9090123456", status: "ACTIVE", joinedDate: "11 May 2025", field: "Electronics", year: "3rd", bio: "Embedded systems." },
        { id: 21, name: "Ajay", university: "IIT Patna", department: "CSE", email: "ajay@example.com", phone: "+91 9101234567", status: "ACTIVE", joinedDate: "11 May 2025", field: "Computer Science", year: "Final", bio: "Early-stage founder." }
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
        // Always persist and return the canonical default students list to avoid duplicates
        const students = clone(defaultStudents);
        try {
            saveAll(students);
        } catch (e) {
            console.warn('Unable to persist default students.', e);
        }
        return students.map(normalizeStudent);
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
