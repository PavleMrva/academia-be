module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('teacher', {

  }, {
    // Other model options go here
    underscored: true,
  });

  Teacher.associate = ({UsersModel, LecturesModel}) => {
    Teacher.belongsTo(UsersModel, {as: 'user', foreignKey: {allowNull: false}});
    Teacher.hasMany(LecturesModel, {as: 'lecture'});
  };

  return Teacher;
};
