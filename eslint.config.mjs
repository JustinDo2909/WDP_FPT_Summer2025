import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next", "next/typescript"),
  {
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off", 
      "react/forbid-elements": "off", 
    },
  },
];

export default eslintConfig;
