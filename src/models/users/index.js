const argon2 = require('argon2');
const errors = require('./errors');
const config = require('../../config');

const PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,50}$');

const PHONE_REGEX = new RegExp(
  '^\\+(9[976]\\d|8[987530]\\d|6[987]\\d|5[90]\\d|42\\d|3[875]\\d|2[98654321]\\d|' +
  '9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\\d{1,14}$',
);


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [5, 50],
          msg: 'Must be a string between 5 and 50 characters of length',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: PASSWORD_REGEX,
          msg: 'Password must be word between 8 and 50 characters which is composed of at least one number, one symbol and one uppercase letter.',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: 'First name has to contain only letters',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
      validate: {
        isAlpha: {
          args: true,
          msg: 'Last name has to contain only letters',
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: PHONE_REGEX,
          msg: 'Phone number not valid',
        },
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['M', 'F', 'NB']],
          msg: 'Gender can only be: M (Male), F (Female), NB (Non-binary)',
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['student', 'teacher', 'admin']],
          msg: 'Type can only be: student, teacher or admin',
        },
      },
    },
  }, {
    // Other model options go here
    underscored: true,
    hooks: {
      beforeSave: async (User) => {
        // hash user password before insert
        User.password = await argon2.hash(User.password, config.passwordHashingParams);
      },
    },
  });

  User.associate = ({StudentsModel, TeachersModel, AdminsModel, LectureCommentsModel}) => {
    User.hasOne(StudentsModel, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
    User.hasOne(TeachersModel, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
    User.hasOne(AdminsModel, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
    User.hasMany(LectureCommentsModel, {as: 'lecture_comments', onDelete: 'cascade'});
  };

  User.Errors = errors;

  User.prototype.checkPassword = async function(password) {
    try {
      return await argon2.verify(this.password, password);
    } catch (err) {
      // invalid password hash probably
      return false;
    }
  };

  User.register = async (userData) => {
    await sequelize.transaction(async (t) => {
      const user = await User.create(userData, {
        transaction: t,
      });
      userData.userId = user.id;

      // if (userData.type === USER_TYPES.STUDENT) {
      //   await Student.create(userData, {
      //     transaction: t,
      //   });
      // } else if (userData.type === USER_TYPES.TEACHER) {
      //   await Teacher.create(userData, {
      //     transaction: t,
      //   });
      // } else {
      //   await Admin.create(userData, {
      //     transaction: t,
      //   });
      // }
    });

    // if (userData.type === USER_TYPES.STUDENT) {
    //   return await User.findOne({
    //     where: {username: userData.username},
    //     include: [{
    //       model: Student,
    //       attributes: ['id', 'city', 'address', 'zipCode'],
    //     }],
    //     attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'gender', 'phone'],
    //   });
    // } else {
    //   return await User.findOne({
    //     where: {username: userData.username},
    //     attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'gender', 'phone'],
    //   });
    // }
  };

  return User;
};
