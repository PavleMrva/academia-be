const {DataTypes} = require('sequelize');
const db = require('../../db');
const Student = require('./students');
const Teacher = require('./teachers');
const Admin = require('./Admin');

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
});

User.hasOne(Student);
User.hasOne(Teacher);
User.hasOne(Admin);

Student.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Teacher.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});
Admin.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'userId',
    allowNull: false,
  },
});

module.exports = {
  UsersModel: User,
  StudentsModel: Student,
  TeachersModel: Teacher,
  AdminsModel: Admin,
};
