module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {

  }, {
    underscored: true,
    // Other model options go here
  });

  Teacher.associate = ({UsersModel, LecturesModel}) => {
    Teacher.belongsTo(UsersModel, {as: 'user'});
    Teacher.hasMany(LecturesModel, {as: 'lecture'});
  };

  return Teacher;
};
