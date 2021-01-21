module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
  ],
  rules: {
    "@typescript-eslint/no-array-constructor": "off",
    "no-unexpected-multiline": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-empty-interface": "off",
    quotes: ["error", "single", { allowTemplateLiterals: true }],
    "func-call-spacing": ["error", "always", { allowNewlines: true }],
    "import/no-relative-parent-imports": "error",
    "import/no-restricted-paths": [
      "error",
      {
        zones: [
          {
            from: "./src/module/BetfairAccount/private/errors/",
            target: "./src/module/BetfairAccount/private/errors/",
            // except: ["*/BetfairAccount/private/*"],
          },
        ],
      },
    ],
  },
};
