const ROLES = require('./roles');
const ALL_ROLES = Object.values(ROLES);

/**
 * Policies need to be deifined either as an array of permissions or as a function
 * which returns an array of permissions
 */
const EndpointPolicies = Object.freeze({
  // Assignments
  '/api/v1/assignments': {POST: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/assignments/:lectureId': {GET: ALL_ROLES},
  '/api/v1/assignments/:assignmentId': {GET: ALL_ROLES, PUT: [ROLES.ADMIN, ROLES.TEACHER], DELETE: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/assignments/submission/:assignmentId': {GET: [ROLES.ADMIN, ROLES.TEACHER], PATCH: [ROLES.ADMIN, ROLES.TEACHER], POST: ALL_ROLES},
  // Course Categories
  '/api/v1/courseCategories': {GET: ALL_ROLES, POST: [ROLES.ADMIN]},
  '/api/v1/courseCategories/:categoryId': {GET: ALL_ROLES, PUT: [ROLES.ADMIN], DELETE: [ROLES.ADMIN]},
  // Course Languages
  '/api/v1/courseLanguages': {GET: ALL_ROLES, POST: [ROLES.ADMIN]},
  '/api/v1/courseLanguages/:languageId': {GET: ALL_ROLES, PUT: [ROLES.ADMIN], DELETE: [ROLES.ADMIN]},
  // Courses
  '/api/v1/courses': {GET: ALL_ROLES, POST: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/courses/:courseId': {GET: ALL_ROLES, PUT: [ROLES.ADMIN, ROLES.TEACHER], DELETE: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/courses/:courseId/price': {PATCH: [ROLES.ADMIN, ROLES.TEACHER]},
  // Lectures
  '/api/v1/lectures': {GET: ALL_ROLES, POST: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/lectures/:lectureId': {GET: ALL_ROLES, PUT: [ROLES.ADMIN, ROLES.TEACHER], DELETE: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/lectures/:lectureId/material': {PATCH: [ROLES.ADMIN, ROLES.TEACHER], DELETE: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/lectures/:lectureId/material/:fileName': {GET: ALL_ROLES, PUT: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/lectures/:lectureId/comments': {GET: ALL_ROLES, POST: ALL_ROLES},
  '/api/v1/lectures/:lectureId/comments/:commentId': {GET: ALL_ROLES, DELETE: [ROLES.ADMIN, ROLES.TEACHER]},
  '/api/v1/lectures/:lectureId/course/:courseId': {PATCH: [ROLES.ADMIN, ROLES.TEACHER]},
  // Payments
  '/api/v1/payments/:courseId/payment': {POST: ALL_ROLES},
  '/api/v1/payments/:paymentId/payment': {POST: ALL_ROLES},
  // Subscriptions
  '/api/v1/subscriptions/:userId': {GET: ALL_ROLES},
  '/api/v1/subscriptions/:courseId/subscribe': {POST: ALL_ROLES},
  '/api/v1/subscriptions/:courseId/unsubscribe': {POST: ALL_ROLES},
  // Users
  '/api/v1/users': {GET: ALL_ROLES},
  '/api/v1/users/login': {POST: ALL_ROLES},
  '/api/v1/users/facebook/auth': {POST: ALL_ROLES},
  '/api/v1/users/google/auth': {POST: ALL_ROLES},
  '/api/v1/users/register': {POST: ALL_ROLES},
  '/api/v1/users/logout': {POST: ALL_ROLES},
});

module.exports = {
  EndpointPolicies,
};
