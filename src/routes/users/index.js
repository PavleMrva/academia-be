const router = require('express').Router();
const passport = require('passport');
const validate = require('../../middleware/validateSchema');
const {checkSchema} = require('express-validator');
const {
  auth: {loginSchema, registrationSchema},
  search: {paginationSchema},
} = require('../../schemas');
const usersController = require('../../controllers/users');

router.get('/', validate(checkSchema(paginationSchema)), usersController.getAllUsers);
router.post('/login', validate(checkSchema(loginSchema)), passport.authenticate('local', {session: false}), usersController.login);
router.post('/facebook/auth', passport.authenticate('facebook-token', {session: false}), usersController.login);
router.post('/google/auth', passport.authenticate('google-token', {session: false}), usersController.login);
router.post('/register', validate(checkSchema(registrationSchema)), usersController.register);
router.post('/logout', usersController.logout);

module.exports = router;
