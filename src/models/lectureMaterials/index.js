module.exports = (sequelize, DataTypes) => {
  const LectureMaterial = sequelize.define('lecture_material', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  LectureMaterial.associate = ({LecturesModel}) => {
    LectureMaterial.belongsTo(LecturesModel, {as: 'lecture', foreignKey: {allowNull: false}});
  };

  return LectureMaterial;
};
