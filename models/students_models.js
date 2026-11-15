// MODEL: holds the data. Right now it's an in-memory array (resets when the server restarts).
// Later you can replace this with a real database (MongoDB, MySQL...) without touching routes.
const students = [
    { id: 1, name: 'eric', gender: 'male', course: 'computer science', level: 3 },
    { id: 2, name: 'aimable', gender: 'male', course: 'computer science', level: 3 },
    { id: 3, name: 'Rachel', gender: 'female', course: 'IT', level: 2 },
    { id: 4, name: 'Trust', gender: 'male', course: 'computer science', level: 4 },
    { id: 5, name: 'angel', gender: 'female', course: 'software engineering', level: 4 },
];

// Keeps track of the next id to give to a new student.
let nextId = students.length + 1;

// Purpose: return every student.
function getAll() {
    return students;
}

// Purpose: find one student by id. Returns undefined if not found.
function getById(id) {
    return students.find((s) => s.id === id);
}

// Purpose: add a new student with an auto-generated id, then return it.
function create({ name, gender, course, level }) {
    const student = { id: nextId++, name, gender, course, level };
    students.push(student);
    return student;
}

// Purpose: change fields of an existing student. Returns the updated student, or undefined if not found.
function update(id, data) {
    const student = getById(id);
    if (!student) return undefined;
    // Only copy fields we allow, so the id can't be changed by accident.
    ['name', 'gender', 'course', 'level'].forEach((field) => {
        if (data[field] !== undefined) student[field] = data[field];
    });
    return student;
}

// Purpose: remove a student. Returns true if deleted, false if not found.
function remove(id) {
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return false;
    students.splice(index, 1);
    return true;
}

module.exports = { getAll, getById, create, update, remove };
