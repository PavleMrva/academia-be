const errors = require('./errors');

module.exports = (sequelize, DataTypes) => {
  const LectureComment = sequelize.define('lecture_comment', {
    content: {
      type: DataTypes.TEXT,
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

  LectureComment.Errors = errors;

  LectureComment.associate = ({LectureCommentsModel, LecturesModel, UsersModel}) => {
    LectureComment.belongsTo(LecturesModel, {as: 'lecture', foreignKey: {allowNull: false}});
    LectureComment.belongsTo(UsersModel, {as: 'user', foreignKey: {allowNull: false}});
    LectureComment.belongsTo(LectureCommentsModel, {as: 'parent_comment', foreignKey: {allowNull: false}});
  };

  return LectureComment;
};
