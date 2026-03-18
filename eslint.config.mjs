import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "next-env.d.ts",
      ".agents/**",
      ".cursor/**",
      "aideal-clone/**",
      "docs/**",
      "imagens-do-site-atual/**",
      "prints-site-atual/**",
    ],
  },
];

export default config;
