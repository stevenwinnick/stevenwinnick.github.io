// `next lint` was removed in Next.js 16; ESLint runs directly against this
// flat config, which `eslint-config-next` ships as native flat-config arrays.
import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [...coreWebVitals, ...typescript];

export default eslintConfig;
