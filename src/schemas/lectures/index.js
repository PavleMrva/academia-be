const saveLectureSchema = {
  title: {
    notEmpty: true,
    errorMessage: 'Lecture title missing',
  },
  description: {
    notEmpty: true,
    errorMessage: 'Description missing',
  },
};

module.exports = {
  saveLectureSchema,
};
