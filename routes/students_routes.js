// ROUTES: maps each URL + HTTP method to a controller function.
// Mounted in server.js under /students, so '/' here means /students.
const express = require('express');
const router = express.Router();
const {
    getStudents,
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
} = require('../controllers/students_controlers');

router.get('/', getStudents);          // list all
router.get('/:id', getStudent);        // get one
router.post('/', createStudent);       // create
router.put('/:id', updateStudent);     // update
router.delete('/:id', deleteStudent);  // delete

module.exports = router;
