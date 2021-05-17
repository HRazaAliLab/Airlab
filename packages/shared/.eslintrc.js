module.exports = {
  env: {
    "shared-node-browser": true,
    "jest": true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
