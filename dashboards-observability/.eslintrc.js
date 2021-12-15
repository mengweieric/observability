/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
  root: false,
  extends: [
    '@elastic/eslint-config-kibana',
    'plugin:@elastic/eui/recommended',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
    {
      "files": [
        "public/**",
        "server/**",
        "common/**"
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

