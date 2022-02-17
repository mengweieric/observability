/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { uniqueId } from 'lodash';
import { EuiPanel, EuiTitle, EuiAccordion, EuiComboBox, EuiSpacer } from '@elastic/eui';

export const PanelItem = ({
  paddingTitle,
  advancedTitle,
  selectedAxis,
  dropdownList,
  children,
  onSelectChange,
  vizState,
  isSingleSelection = false,
}: any) => {
  const options = dropdownList.map((item) => {
    return {
      ...item,
      label: item.name,
    };
  });
  const handleSelect = (selectedOption) => {
    onSelectChange(selectedOption);
  };

  return (
    <>
      <EuiTitle size="xxs">
        <h3>{paddingTitle}</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiComboBox
        id={uniqueId('axis-select-')}
        placeholder="Select a field"
        options={options}
        selectedOptions={selectedAxis}
        singleSelection={isSingleSelection}
        onChange={onSelectChange}
        aria-label="Use aria labels when no actual label is in use"
      />
    </>
  );
};
