module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "import-helpers", "better-styled-components"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "react/prop-types": 0,
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          "/^react/",
          "module",
          "/^src/components/",
          "/^src/pages/",
          "/^src/utils/",
          "/^src/services/",
          "/^src/styles/",
          "/^src/assets/",
          ["parent", "sibling", "index"],
        ],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
    "better-styled-components/sort-declarations-alphabetically": 2,
    "no-unused-vars":[
      "error",
      {
        "varsIgnorePattern": "React"
      }
    ]
  },
};
