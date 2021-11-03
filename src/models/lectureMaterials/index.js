module.exports = (sequelize, DataTypes) => {
  const LectureMaterial = sequelize.define('LectureMaterial', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['video', 'audio', 'pdf']],
          msg: 'Lecture type can only be: video, audio or pdf',
        },
      },
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    // Other model options go here
    underscored: true,
  });

  LectureMaterial.associate = ({LecturesModel}) => {
    LectureMaterial.belongsTo(LecturesModel, {as: 'lecture'});
  };

  return LectureMaterial;
};
