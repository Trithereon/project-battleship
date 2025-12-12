import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jest from "eslint-plugin-jest";

export default defineConfig([
  js.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: [
      "**/*.test.{js,mjs,cjs}",
      "**/__tests__/**/*.{js,mjs,cjs}",
      "**/*.spec.{js,mjs,cjs}",
    ],
    plugins: {
      jest,
    },
    rules: {
      ...jest.configs["flat/recommended"].rules,
      ...jest.configs["flat/style"].rules, // optional but recommended
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
]);
