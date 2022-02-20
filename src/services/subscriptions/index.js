const {
  CoursesModel,
  PaymentsModel,
  SubscriptionsModel,
  StudentsModel,
} = require('../../models');

const getUserSubscriptions = async (userId) => {
  const student = await StudentsModel.findOne({
    where: {userId},
  });

  if (!student) {
    throw new StudentsModel.Errors.StudentWithUserIdNotFound(userId);
  }

  return await SubscriptionsModel.findAll({where: {studentId: student.id, subscriptionEndDate: null}});
};

const subscribeToCourse = async (userId, courseId, paymentId) => {
  const student = await StudentsModel.findOne({
    where: {userId},
  });

  if (!student) {
    throw new StudentsModel.Errors.StudentWithUserIdNotFound(userId);
  }

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
    studentId: student.id,
    courseId,
    paymentId,
  });
};

const unsubscribeFromCourse = async (userId, courseId) => {
  const student = await StudentsModel.findOne({
    where: {userId},
  });

  if (!student) {
    throw new StudentsModel.Errors.StudentWithUserIdNotFound(userId);
  }

  await SubscriptionsModel.update({
    subscriptionEndDate: Date.now(),
    courseId,
  }, {where: {studentId: student.id, courseId}});
};

module.exports = {
  getUserSubscriptions,
  subscribeToCourse,
  unsubscribeFromCourse,
};
