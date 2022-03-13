const config = require('../config');
const {Sequelize, DataTypes} = require('sequelize');
const logger = require('../libs/logger');

const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  host: 'mysqldb', // mysql container name
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
});

const models = {
  AdminsModel: require('./admins')(sequelize, DataTypes),
  AssignmentsModel: require('./assignments')(sequelize, DataTypes),
  AssignmentSubmissionsModel: require('./assignmentSubmissions')(sequelize, DataTypes),
  CourseCategoriesModel: require('./courseCategories')(sequelize, DataTypes),
  CourseLanguagesModel: require('./courseLanguages')(sequelize, DataTypes),
  CourseLecturesModel: require('./courseLectures')(sequelize, DataTypes),
  CoursePricesModel: require('./coursePrices')(sequelize, DataTypes),
  CoursesModel: require('./courses')(sequelize, DataTypes),
  LectureCommentsModel: require('./lectureComments')(sequelize, DataTypes),
  LectureMaterialsModel: require('./lectureMaterials')(sequelize, DataTypes),
  LecturesModel: require('./lectures')(sequelize, DataTypes),
  PaymentsModel: require('./payments')(sequelize, DataTypes),
  StudentCourseDetailsModel: require('./studentCourseDetails')(sequelize, DataTypes),
  StudentsModel: require('./students')(sequelize, DataTypes),
  SubscriptionsModel: require('./subscriptions')(sequelize, DataTypes),
  TeachersModel: require('./teachers')(sequelize, DataTypes),
  UsersModel: require('./users')(sequelize, DataTypes),
};

// Associate tables in the DB
Object.keys(models).forEach((modelKey) => {
  // Create model associations
  if ('associate' in models[modelKey]) {
    models[modelKey].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
