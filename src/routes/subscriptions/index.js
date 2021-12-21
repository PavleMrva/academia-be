const router = require('express').Router();
// const validate = require('../../middleware/validateSchema');
// const {checkSchema} = require('express-validator');
// const {
//   assignments: {
//     saveAssignmentSchema,
//     findAssignmentSchema,
//   },
//   search: {paginationSchema},
// } = require('../../schemas');
const subscriptionsController = require('../../controllers/subscriptions');

router.get('/', subscriptionsController.getSubscriptions);

module.exports = router;
