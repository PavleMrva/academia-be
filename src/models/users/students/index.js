const {DataTypes} = require('sequelize');
const db = require('../../../db');

const Student = db.define('student', {
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  // Other model options go here
});

module.exports = Student;
