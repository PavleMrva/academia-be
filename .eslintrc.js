module.exports = {
  extends: ['eslint:recommended', 'google'],
  parser: '@babel/eslint-parser',
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
  rules: {
    'new-cap': ['error', {capIsNewExceptionPattern: '(express|mongo).'}],
    'max-len': [
      'error',
      {
        code: 120,
        comments: 999,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'indent': ['error', 2, {SwitchCase: 1}],
    'spaced-comment': ['error', 'always', {markers: ['/']}],
    'no-console': 'warn',
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
  },
};
