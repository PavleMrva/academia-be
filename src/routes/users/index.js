const router = require('express').Router();
const usersController = require('../../controllers/users');

router.get('/', usersController.getAllUsers);

router.post('/:type(student|teacher|admin)/login', usersController.login);

router.post('/register', usersController.register);

module.exports = router;
