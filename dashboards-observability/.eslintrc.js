/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = {
  root: true,
  extends: [
    '@elastic/eslint-config-kibana',
    "eslint:recommended",
    'plugin:@elastic/eui/recommended'
  ],
  ignorePatterns: ["test/**", ".cypress/**", "node_modules/**"],
  overrides: [
    {
      "files": ['*.ts', '*.tsx', '*.js', '*.jsx'],
      "excludedFiles": "*.test.js"
    }
  ]
};