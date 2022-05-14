module.exports = {
  env: {
    // browser: true,
    commonjs: true,
    es2022: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: ['warn', 'never'],
    'linebreak-style': ['error', 'windows'],
    'no-unused-vars': ['warn', { args: 'none' }],
    quotes: ['warn', 'single'],
    'no-undef': 'off'
  }
}
