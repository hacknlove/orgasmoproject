module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "jest-extended"],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "react/prop-types": 0,
    "no-constant-condition": ["error", { checkLoops: false }],
  },
  ignorePatterns: [
    "**/dist/**/*",
    "/examples/infinite",
    "/create-orgasmo/empty",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
};
