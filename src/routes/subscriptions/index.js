const router = require('express').Router();
const subscriptionsController = require('../../controllers/subscriptions');

router.get('/', subscriptionsController.getUserSubscriptions);
router.post('/:courseId/subscribe', subscriptionsController.subscribeToCourse);
router.post('/:courseId/unsubscribe', subscriptionsController.unsubscribeFromCourse);

module.exports = router;
