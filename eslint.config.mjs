import nextPlugin from "eslint-config-next";
import tseslint from "typescript-eslint";

export default [
  ...tseslint.configs.recommended,
  ...nextPlugin,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
