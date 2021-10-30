const db = require('../../db');

const Admin = db.define('Admin', {

}, {
  underscored: true,
  // Other model options go here
});

module.exports = Admin;
