module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  Assignment.associate = ({CoursesModel, AssignmentSubmissionsModel}) => {
    Assignment.belongsTo(CoursesModel);
    Assignment.hasMany(AssignmentSubmissionsModel);
  };

  return Assignment;
};
