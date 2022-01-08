module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('assignment', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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

  Assignment.associate = ({LecturesModel, AssignmentSubmissionsModel}) => {
    Assignment.belongsTo(LecturesModel, {foreignKey: {allowNull: false}});
    Assignment.hasMany(AssignmentSubmissionsModel, {onDelete: 'cascade'});
  };

  return Assignment;
};
