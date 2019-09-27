module.exports = {
  parserOptions: {
    sourceType: "module"
  },

  env: {
    node: true
  },
  extends: [
    "standard",
    "prettier",
    "prettier/standard",
    "plugin:jest/recommended"
  ]
};
