module.exports = (sequelize) => {
  const Admin = sequelize.define('Admin', {

  }, {
    underscored: true,
    // Other model options go here
  });

  Admin.associate = ({UsersModel}) => {
    Admin.belongsTo(UsersModel, {as: 'user'});
  };

  return Admin;
};
