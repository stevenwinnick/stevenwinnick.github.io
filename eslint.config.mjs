import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

// `next lint` was removed in Next.js 16, so ESLint runs directly against this
// flat config. `eslint-config-next` ships native flat-config arrays.
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      // Prose content contains many apostrophes and quotes; escaping every one
      // hurts readability without changing what the browser renders.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
