const {
  CoursesModel,
  PaymentsModel,
  SubscriptionsModel,
} = require('../../models');

const getUserSubscriptions = async (userId) => {
  return await SubscriptionsModel.findAll({where: {userId, subscriptionEndDate: null}});
};

const subscribeToCourse = async (userId, courseId, paymentId) => {
  const course = await CoursesModel.findOne({where: {id: courseId}});

  if (!course) {
    throw new CoursesModel.Errors.CourseNotFoundById(courseId);
  }

  const payment = await PaymentsModel.findOne({where: {id: paymentId}});

  if (!payment) {
    throw new PaymentsModel.Errors.PaymentNotFound(paymentId);
  }

  await SubscriptionsModel.create({
    subscriptionStartDate: Date.now(),
    subscriptionEndDate: null,
    userId,
    courseId,
    paymentId,
  });
};

const unsubscribeFromCourse = async (userId, courseId) => {
  await SubscriptionsModel.update({
    subscriptionEndDate: Date.now(),
    userId,
    courseId,
  }, {where: {userId, courseId}});
};

module.exports = {
  getUserSubscriptions,
  subscribeToCourse,
  unsubscribeFromCourse,
};
