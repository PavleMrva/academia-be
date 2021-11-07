module.exports = (sequelize) => {
  const Admin = sequelize.define('admin', {

  }, {
    // Other model options go here
    underscored: true,
  });

  Admin.associate = ({UsersModel}) => {
    Admin.belongsTo(UsersModel, {as: 'user', foreignKey: {allowNull: false}});
  };

  return Admin;
};
