// middleware for doing role-based permissions
module.exports = (...permittedRoles) => {
  // return a middleware
  return (req, res, next) => {
    const {user} = req;

    if (user && permittedRoles.includes(user.type)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      return res.forbidden(); // user is forbidden
    }
  };
};
