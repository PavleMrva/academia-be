const db = require('../../../db');

const Teacher = db.define('Teacher', {

}, {
  underscored: true,
  // Other model options go here
});

module.exports = Teacher;
