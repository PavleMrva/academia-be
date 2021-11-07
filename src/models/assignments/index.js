module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('assignment', {
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
    Assignment.belongsTo(CoursesModel, {foreignKey: {allowNull: false}});
    Assignment.hasMany(AssignmentSubmissionsModel, {onDelete: 'cascade'});
  };

  return Assignment;
};
