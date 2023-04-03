// Following guide https://cathalmacdonnacha.com/setting-up-eslint-prettier-in-vitejs
module.exports = {
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    // Removes requirement for importing React into every file
    // https://stackoverflow.com/a/72259787
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "eslint-config-prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
};
