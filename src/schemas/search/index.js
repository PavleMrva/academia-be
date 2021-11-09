const paginationSchema = {
  perPage: {
    in: ['query'],
    isInt: {
      options: {gt: 0},
    },
    customSanitizer: {
      options: (value) => {
        return parseInt(value, 10);
      },
    },
  },
  pageNum: {
    in: ['query'],
    isInt: {
      options: {gt: 0},
    },
    customSanitizer: {
      options: (value) => {
        return parseInt(value, 10);
      },
    },
  },
};

module.exports = {
  paginationSchema,
};
