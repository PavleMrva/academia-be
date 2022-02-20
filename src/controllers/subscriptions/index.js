const subscriptionsService = require('../../services/subscriptions');

const getUserSubscriptions = async (req, res) => {
  const {user: {userId}} = req;
  const subscriptions = subscriptionsService.getUserSubscriptions(userId);

  if (!subscriptions) {
    return res.notFound(null, 'User has no active subscriptions');
  }

  res.success(subscriptions);
};

const subscribeToCourse = async (req, res) => {
  const {user: {userId}} = req;
  const {courseId} = req.params;
  const {paymentId} = req.body;

  if (!paymentId) {
    return res.missingParams(['paymentId']);
  }

  await subscriptionsService.subscribeToCourse(userId, courseId, paymentId);
};

const unsubscribeFromCourse = async (req, res) => {
  const {user: {userId}} = req;
  const {courseId} = req.params;

  await subscriptionsService.unsubscribeFromCourse(userId, courseId);
};

module.exports = {
  getUserSubscriptions,
  subscribeToCourse,
  unsubscribeFromCourse,
};
