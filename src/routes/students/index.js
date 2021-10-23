const router = require('express').Router();
const studentsController = require('../../controllers/students');

router.get('/', studentsController.getAllStudents);

module.exports = router;
