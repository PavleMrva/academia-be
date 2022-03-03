const {EndpointPolicies} = require('../config/permissions');
const _ = require('lodash');
const {pathToRegexp} = require('path-to-regexp');

// middleware for doing role-based permissions
module.exports = () => {
  const getLongestString = (array) => array.reduce((a, b) => a.length > b.length ? a : b);
  const regexPolicies = _.mapValues(EndpointPolicies,
    (value, key) => ({regex: pathToRegexp(key, [], {end: false}), ...value}));

  const getAllowedRolesForEndpoint = (endpoint) => {
    // find all policies matching endpoint
    const matchingPolicies = _.pickBy(regexPolicies, (value) => value.regex.test(endpoint));

    if (!_.keys(matchingPolicies).length) return null;

    // if multiple match, select the most specific one
    const bestMatch = getLongestString(_.keys(matchingPolicies));

    return regexPolicies[bestMatch];
  };

  const getAllowedRolesForMethod = (endpointPermissions, method) => {
    console.log(endpointPermissions[method]);
    if (endpointPermissions[method]) return endpointPermissions[method];
    return null;
  };

  // return a middleware
  return (req, res, next) => {
    const whitelistRoutesRegex = new RegExp(/\/(login|register|auth)$/);

    if (whitelistRoutesRegex.test(req.path)) {
      return next();
    }

    const {user} = req;
    const endpoint = req.path;
    const endpointPermissions = getAllowedRolesForEndpoint(endpoint);
    const allowedRoles = getAllowedRolesForMethod(endpointPermissions, req.method);

    try {
      if (!allowedRoles.includes(user.role)) {
        return res.forbidden({message: `Access forbidden for role ${user.role}`});
      }
      next();
    } catch (err) {
      return next(err);
    }
  };
};
