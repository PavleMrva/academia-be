const router = require('express').Router();
const passport = require('passport');
const validate = require('../../middleware/validateSchema');
const {checkSchema} = require('express-validator');
const {auth: {loginSchema, registrationSchema}} = require('../../schemas');
const usersController = require('../../controllers/users');

router.get('/', usersController.getAllUsers);

router.post('/login', validate(checkSchema(loginSchema)), passport.authenticate('local', {session: false}), usersController.login);

router.post('/auth/facebook', passport.authenticate('facebook-token', {session: false}), usersController.login);

router.post('/auth/google', passport.authenticate('google-token', {session: false}), usersController.login);

router.post('/:type(student|teacher|admin)/register', validate(checkSchema(registrationSchema)), usersController.register);

router.post('/logout', usersController.logout);

module.exports = router;
