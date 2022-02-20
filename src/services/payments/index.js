const {
  CoursesModel,
  CourseCategoriesModel,
  CoursePricesModel,
  PaymentsModel,
  StudentsModel,
  UsersModel,
} = require('../../models');
const {Iyzipay} = require('../../external');
const dayjs = require('dayjs');

const executePayment = async (courseId, userId, paymentDetails) => {
  const user = await UsersModel.findOne({
    where: {id: userId},
    include: [{
      model: StudentsModel,
      attributes: ['id', 'city', 'address', 'zipCode'],
    }],
    attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'gender', 'phone'],
  });

  if (!user.student.id) {
    throw new StudentsModel.Errors.StudentWithUserIdNotFound(userId);
  }

  const course = await CoursesModel.findOne({
    where: {id: courseId},
    include: [{
      model: CourseCategoriesModel,
      attributes: ['name'],
    }],
  });

  if (!course) {
    throw new CoursesModel.Errors.CourseNotFoundById(courseId);
  }

  const coursePrice = await CoursePricesModel.findOne({where: {
    courseId,
    currency: paymentDetails.currency,
  }});

  if (!coursePrice) {
    throw new CoursePricesModel.Errors.CoursePriceNotFound(courseId, paymentDetails.currency);
  }

  const courseDetails = {
    id: courseId,
    name: course.name,
    category: course.courseCategory.name,
    price: course.price,
  };

  const userInfo = {
    userId,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.student.address,
    city: user.student.city,
    country: user.student.country,
    zipCode: user.student.zipCode,
  };

  const result = await Iyzipay.executePayment(paymentDetails, userInfo, courseDetails);

  return await PaymentsModel.create({
    amount: result.paidPrice,
    paymentId: result.paymentId,
    paymentDate: Date.now(),
    isPaid: result.status.toLowerCase() === 'success',
    currency: result.currency,
  });
};

const cancelPayment = async (paymentId) => {
  const payment = await PaymentsModel.findOne({
    where: {id: paymentId},
  });

  if (!paymentId) {
    throw new PaymentsModel.Errors.PaymentNotFound(paymentId);
  }

  const now = dayjs(Date.now());
  const paymentDate = dayjs(payment.paymentDate);
  const timeElapsed = now.diff(paymentDate, 'hour', true);

  if (timeElapsed > 24) {
    throw new PaymentsModel.Errors.PaymentCannotBeCanceled(paymentId);
  }

  return await Iyzipay.cancelPayment(payment.paymentId);
};

module.exports = {
  executePayment,
  cancelPayment,
};
