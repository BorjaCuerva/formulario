const RULES = {
  OFF: 'off',
  WARN: 'WARN',
  ERROR: 'ERROR'
}

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    semi: RULES.OFF
  }
}
