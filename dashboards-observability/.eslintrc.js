/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
  root: true,
  extends: [
    '@elastic/eslint-config-kibana',
    'plugin:@elastic/eui/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      "files": [
        "**/*.ts",
        "**/*.tsx",
        "**/*.js",
        "**/*.jsx"
      ],
      "excludedFiles": [
        "*.spec.js",
        "*.test.ts",
        "*.test.tsx",
        "*.test.js",
        "*.test.jsx"
      ]
    }
  ]
};

