const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const UsersModel = require('../models/users');
const config = require('../config');

module.exports = () => {
  passport.use(new FacebookTokenStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
  },
  async function(accessToken, refreshToken, profile, done) {
    const email = profile._json.email;
    try {
      const user = await UsersModel.findOne({
        where: {email},
        attributes: [['id', 'userId'], 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName']],
      });

      if (!user) {
        done(new UsersModel.Errors.UserWithEmailNotFound(email));
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
  );

  passport.use(new GoogleTokenStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
  },
  async function(accessToken, refreshToken, profile, done) {
    const email = profile._json.email;
    try {
      const user = await UsersModel.findOne({
        where: {email},
        attributes: [['id', 'userId'], 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName']],
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  }),
  );

  passport.use(new LocalStrategy(
    async function(username, password, done) {
      try {
        const user = await UsersModel.findOne({
          where: {username},
          attributes: ['id', 'username', 'email', ['first_name', 'firstName'], ['last_name', 'lastName'], 'password'],
        });

        const isPasswordCorrect = await user.checkPassword(password);
        if (!isPasswordCorrect) {
          return done(new UsersModel.Errors.UserPasswordIncorrect());
        }

        done(null, {
          userId: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      } catch (err) {
        done(err);
      }
    },
  ));
};
