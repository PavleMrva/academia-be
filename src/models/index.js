const {Sequelize, DataTypes} = require('sequelize');
const logger = require('../libs/logger');

const sequelize = new Sequelize('academia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: (msg) => logger.debug(msg),
});

const models = {
  AdminsModel: require('./admins')(sequelize, DataTypes),
  // AssignmentsModel: require('./assignments')(sequelize, DataTypes),
  CourseLecturesModel: require('./courseLectures')(sequelize, DataTypes),
  CoursesModel: require('./courses')(sequelize, DataTypes),
  LectureMaterialsModel: require('./lectureMaterials')(sequelize, DataTypes),
  LecturesModel: require('./lectures')(sequelize, DataTypes),
  StudentsModel: require('./students')(sequelize, DataTypes),
  // Subscription: require('./subscriptions')(sequelize, DataTypes),
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
