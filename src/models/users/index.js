const {DataTypes} = require('sequelize');
const argon2 = require('argon2');
const errors = require('./errors');
const config = require('../../config');
const db = require('../../db');
const Student = require('./students');
const Teacher = require('./teachers');
const Admin = require('./admins');

const USER_TYPES = {
  STUDENT: 'student',
  TEACHER: 'teacher',
  ADMIN: 'admin',
};

const User = db.define('user', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    isEmail: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
  underscored: true,
  hooks: {
    beforeSave: async (User) => {
      // hash user password before insert
      User.password = await argon2.hash(User.password, config.passwordHashingParams);
    },
  },
});

User.hasOne(Student, {
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
User.hasOne(Teacher, {
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
User.hasOne(Admin, {
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

Student.belongsTo(User, {as: 'user'});
Teacher.belongsTo(User, {as: 'user'});
Admin.belongsTo(User, {as: 'user'});

User.Errors = errors;

User.prototype.checkPassword = async function(password) {
  try {
    return await argon2.verify(this.password, password);
  } catch (err) {
    // invalid password hash probably
    return false;
  }
};

User.prototype.userByTypeExists = async function(type) {
  let user;
  if (type === USER_TYPES.STUDENT) {
    user = await Student.findOne({where: {userId: this.id}});
  } else if (type === USER_TYPES.TEACHER) {
    user = await Teacher.findOne({where: {userId: this.id}});
  } else {
    user = await Admin.findOne({where: {userId: this.id}});
  }

  return !!user;
};

// User.prototype.validatePassword = function(password) {
//   // Word between 8 and 50 characters which is composed of at least one number, symbol and uppercase (e.g. Password1!, N33du2g0!, dasda!!2DD etc.);
//   const passwordValidationRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,50}$');
//
//   // validate new password
//   if (!passwordValidationRegex.test(password)) {
//     throw new errors.PasswordValidationError();
//   }
// };

module.exports = {
  UsersModel: User,
  StudentsModel: Student,
  TeachersModel: Teacher,
  AdminsModel: Admin,
};
