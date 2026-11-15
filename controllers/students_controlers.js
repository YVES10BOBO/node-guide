// CONTROLLER: receives the request, talks to the model, and sends back the response (JSON).
const Student = require('../models/students_models');

// Purpose: GET /students -> send the list of all students.
function getStudents(req, res) {
    res.json(Student.getAll());
}

// Purpose: GET /students/:id -> send one student, or 404 if the id doesn't exist.
function getStudent(req, res) {
    const student = Student.getById(Number(req.params.id));
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
}

// Purpose: POST /students -> validate the body, create a student, reply 201 (Created).
function createStudent(req, res) {
    const { name, gender, course, level } = req.body || {};
    if (!name || !gender || !course || level === undefined) {
        return res.status(400).json({ message: 'name, gender, course and level are required' });
    }
    const student = Student.create({ name, gender, course, level });
    res.status(201).json(student);
}

// Purpose: PUT /students/:id -> update the given fields of a student, or 404 if not found.
function updateStudent(req, res) {
    const student = Student.update(Number(req.params.id), req.body || {});
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
}

// Purpose: DELETE /students/:id -> remove a student, or 404 if not found.
function deleteStudent(req, res) {
    const deleted = Student.remove(Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted' });
}

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent };
