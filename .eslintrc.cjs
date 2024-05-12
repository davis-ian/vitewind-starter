/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/valid-v-slot': 'off' // Disabling this rule if you need to use dynamic slot names
    // 'vue/no-deprecated-v-slot-attribute': 'error' // Ensure you are not using deprecated attributes
  }
};
