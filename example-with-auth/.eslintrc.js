module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'quotes': ["error", "double"],
    'no-irregular-whitespace': ["error", { "skipComments": true }],
    'no-multi-spaces': ["error", { ignoreEOLComments: false }],
    'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 0 }],
    'eol-last': ["error", "always"],
    'no-trailing-spaces': "error",
    'semi': ["error", "always"]
  },
};
