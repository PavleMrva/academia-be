const {
  sequelize,
  UsersModel,
  StudentsModel,
  TeachersModel,
  AdminsModel,
} = require('../../models');

const USER_TYPES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};

const getAllUsers = () => {
  return UsersModel.findAll({
    include: [{
      model: StudentsModel,
    }],
    attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'gender', 'phone'],
  });
};

const authenticate = async (username, type) => {
  const user = await UsersModel.findOne({
    where: {username},
    attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'password'],
  });

  let userExists;
  if (type === USER_TYPES.STUDENT) {
    userExists = await user.getStudent();
  } else if (type === USER_TYPES.TEACHER) {
    userExists = await user.getTeacher();
  } else {
    userExists = await user.getAdmin();
  }

  if (!userExists) {
    throw new UsersModel.Errors.UserTypeWithUsernameNotFound(type, username);
  }
};

const register = async (userData) => {
  const isTypeValid = Object.keys(USER_TYPES).some((t) => USER_TYPES[t] === userData.type);

  if (!isTypeValid) {
    throw new UsersModel.Errors.UserTypeNotValid(userData.type);
  }

  await sequelize.transaction(async (t) => {
    const user = await UsersModel.create(userData, {
      transaction: t,
    });
    userData.userId = user.id;

    if (userData.type === USER_TYPES.STUDENT) {
      await StudentsModel.create(userData, {
        transaction: t,
      });
    } else if (userData.type === USER_TYPES.TEACHER) {
      await TeachersModel.create(userData, {
        transaction: t,
      });
    } else {
      await AdminsModel.create(userData, {
        transaction: t,
      });
    }
  });

  if (userData.type === USER_TYPES.STUDENT) {
    return await UsersModel.findOne({
      where: {username: userData.username},
      include: [{
        model: StudentsModel,
        attributes: ['id', 'city', 'address', 'zipCode'],
      }],
      attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'gender', 'phone'],
    });
  } else {
    return await UsersModel.findOne({
      where: {username: userData.username},
      attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'gender', 'phone'],
    });
  }
};

module.exports = {
  getAllUsers,
  authenticate,
  register,
};
