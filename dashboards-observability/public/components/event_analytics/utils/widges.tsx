/* eslint-disable no-bitwise */
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EuiText } from '@elastic/eui';

interface TabTitleProps {
  tabId: string;
  tabName: string;
}

export const TabTitle = ({ tabId, tabName }: TabTitleProps) => {
  return (
    <EuiText data-test-subj={`${tabId}Tab`} size="s" textAlign="left" color="default">
      <span className="tab-title">{tabName}</span>
    </EuiText>
  );
};
