class StudentNotFound extends Error {
  constructor(username) {
    super();
    this.username = username;
    this.name = 'StudentNotFound';
    this.resultCode = 'student_not_found';
    this.message = `Student not found: ${username}`;
  }
}

module.exports = {
  StudentNotFound,
};
