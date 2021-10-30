const router = require('express').Router();
const validate = require('../../middleware/validateSchema');
const {checkSchema} = require('express-validator');
const {auth: {loginSchema, registrationSchema}} = require('../../schemas');
const usersController = require('../../controllers/users');

router.get('/', usersController.getAllUsers);

router.post('/:type(student|teacher|admin)/login', validate(checkSchema(loginSchema)), usersController.login);

router.post('/:type(student|teacher|admin)/register', validate(checkSchema(registrationSchema)), usersController.register);

router.post('/logout', usersController.logout);

module.exports = router;
