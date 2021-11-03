module.exports = (sequelize) => {
  const Admin = sequelize.define('Admin', {

  }, {
    // Other model options go here
    underscored: true,
  });

  Admin.associate = ({UsersModel}) => {
    Admin.belongsTo(UsersModel, {as: 'user'});
  };

  return Admin;
};
