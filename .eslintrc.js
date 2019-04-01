module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    "comma-dangle": [
      "error",
      "always"
  ],
    'no-extra-semi': 0,
    "indent": ["error", 2],
      "vue/html-self-closing": 0
  }
}
