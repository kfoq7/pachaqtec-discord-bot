module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'linebreak-style': ['error', 'windows'],
    'no-unused-vars': 'warn',
    quotes: ['warn', 'single'],
    semi: ['warn', 'never'],
    'space-before-function-paren': 'never'
  }
}
