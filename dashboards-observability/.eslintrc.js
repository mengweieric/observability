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
  "overrides": [
    {
      "files": ["*.js", "*.jsx", "*.ts", "*.tsx"],
      "excludedFiles": "*.test.js",
    }
  ]
};