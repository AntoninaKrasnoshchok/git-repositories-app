module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: [2, 'double', { avoidEscape: true }],
    "object-curly-newline": ["warn", { "multiline": true }],
    "camelcase": [2, { "ignoreDestructuring": true }],
    "operator-linebreak": [2, "before", { "overrides": { "?": "after" } }],
  },
};
