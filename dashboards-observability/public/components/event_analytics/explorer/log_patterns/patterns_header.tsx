/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiLink,
  EuiPopover,
  EuiPopoverFooter,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { PPL_PATTERNS_DOCUMENTATION_URL } from '../../../../../common/constants/shared';

export const LogPatternsHeader = ({
  viewLogPatterns,
  patternsData,
  patternRegexInput,
  setPatternRegexInput,
  onPatternSelection,
  setViewLogPatterns,
  onApply,
}: any) => {
  const [isPatternConfigPopoverOpen, setIsPatternConfigPopoverOpen] = useState(false);

  return (
    <>
      <EuiFlexGroup
        justifyContent="spaceBetween"
        alignItems="center"
        style={{ margin: '8px' }}
        gutterSize="xs"
      >
        <EuiFlexItem grow={false}>
          {viewLogPatterns && (
            <EuiFlexGroup gutterSize="s" alignItems="center">
              <EuiFlexItem grow={false}>
                <EuiTitle size="s">
                  <h3 style={{ margin: '0px' }}>
                    Patterns{' '}
                    <span className="pattern-header-count">
                      ({patternsData.patternTableData?.length || 0})
                    </span>
                  </h3>
                </EuiTitle>
              </EuiFlexItem>
              <EuiFlexItem grow={false}>
                <EuiPopover
                  button={
                    <EuiButtonIcon
                      iconType="gear"
                      onClick={() => setIsPatternConfigPopoverOpen(!isPatternConfigPopoverOpen)}
                    />
                  }
                  isOpen={isPatternConfigPopoverOpen}
                  closePopover={() => setIsPatternConfigPopoverOpen(false)}
                  anchorPosition="upCenter"
                >
                  <EuiTitle size="xxs">
                    <h3>Pattern regex</h3>
                  </EuiTitle>
                  <EuiText size="s">Log patterns allow you to cluster your logs, to help</EuiText>
                  <EuiText size="s">summarize large volume of logs.</EuiText>
                  <EuiSpacer size="s" />
                  <EuiFormRow
                    helpText={
                      <EuiText size="s">
                        Pattern regex is used to reduce logs into log groups.{' '}
                        <EuiLink href={PPL_PATTERNS_DOCUMENTATION_URL} target="_blank">
                          help
                        </EuiLink>
                      </EuiText>
                    }
                  >
                    <EuiFieldText
                      value={patternRegexInput}
                      onChange={(e) => setPatternRegexInput(e.target.value)}
                    />
                  </EuiFormRow>
                  <EuiPopoverFooter>
                    <EuiFlexGroup justifyContent="flexEnd">
                      <EuiFlexItem grow={false}>
                        <EuiButtonEmpty
                          size="s"
                          onClick={() => setIsPatternConfigPopoverOpen(false)}
                        >
                          Cancel
                        </EuiButtonEmpty>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false}>
                        <EuiButton
                          size="s"
                          fill
                          onClick={() => {
                            onApply();
                            setIsPatternConfigPopoverOpen(false);
                          }}
                        >
                          Apply
                        </EuiButton>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </EuiPopoverFooter>
                </EuiPopover>
              </EuiFlexItem>
            </EuiFlexGroup>
          )}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              {viewLogPatterns && (
                <EuiText size="s">
                  <EuiLink onClick={() => onPatternSelection('')}>Clear Selection</EuiLink>
                </EuiText>
              )}
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiText size="s">
                <EuiLink
                  onClick={() => {
                    // hide patterns will also clear pattern selection
                    if (viewLogPatterns) {
                      onPatternSelection('');
                    }
                    setViewLogPatterns(!viewLogPatterns);
                    setIsPatternConfigPopoverOpen(false);
                  }}
                >
                  {`${viewLogPatterns ? 'Hide' : 'Show'} Patterns`}
                </EuiLink>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
