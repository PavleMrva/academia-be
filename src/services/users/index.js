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

const getAllUsers = (perPage, pageNum) => {
  return UsersModel.findAll({
    limit: perPage,
    offset: perPage * (pageNum - 1),
    include: [{
      model: StudentsModel,
    }],
    attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'gender', 'phone'],
  });
};

const authenticate = async (username) => {
  const user = await UsersModel.findOne({
    where: {username},
    attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'password', 'role'],
  });

  let userExists;
  if (user.role === USER_TYPES.STUDENT) {
    userExists = await user.getStudent();
  } else if (user.role === USER_TYPES.TEACHER) {
    userExists = await user.getTeacher();
  } else {
    userExists = await user.getAdmin();
  }

  if (!userExists) {
    throw new UsersModel.Errors.UserTypeWithUsernameNotFound(user.role, username);
  }
};

const register = async (userData) => {
  const isTypeValid = Object.keys(USER_TYPES).some((t) => USER_TYPES[t] === userData.role);

  if (!isTypeValid) {
    throw new UsersModel.Errors.UserTypeNotValid(userData.role);
  }

  await sequelize.transaction(async (t) => {
    const user = await UsersModel.create(userData, {
      transaction: t,
    });
    userData.userId = user.id;

    if (userData.role === USER_TYPES.STUDENT) {
      await StudentsModel.create(userData, {
        transaction: t,
      });
    } else if (userData.role === USER_TYPES.TEACHER) {
      await TeachersModel.create(userData, {
        transaction: t,
      });
    } else {
      await AdminsModel.create(userData, {
        transaction: t,
      });
    }
  });

  if (userData.role === USER_TYPES.STUDENT) {
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
