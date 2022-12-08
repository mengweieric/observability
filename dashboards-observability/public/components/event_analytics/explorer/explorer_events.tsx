/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { isEmpty, reduce } from 'lodash';
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiTitle,
} from '@elastic/eui';
import { FormattedMessage } from '@osd/i18n/react';
import { NoResults } from './no_results';
import classNames from 'classnames';

export const ExplorerEvents = ({ configs, ...eventProps }: any) => {
  const {
    LeftSideBar,
    HitsCounter,
    CountDistribution,
    TimechartHeader,
    EventView,
    PatternsTable,
    LogPatternHeader,
    LiveTailView,
  } = configs;
  const {
    explorerData,
    countDistribution,
    isLiveTailOn,
  } = eventProps;

  const [isSidebarClosed, setIsSidebarClosed] = useState(false);
  const sidebarClassName = classNames({
    closed: isSidebarClosed,
  });

  const mainSectionClassName = classNames({
    'col-md-10': !isSidebarClosed,
    'col-md-12': isSidebarClosed,
  });

  return (
    <main className="container-fluid">
      <div className="row">
        <div
          className={`col-md-2 dscSidebar__container dscCollapsibleSidebar ${sidebarClassName}`}
          id="discover-sidebar"
          data-test-subj="eventExplorer__sidebar"
        >
          {!isSidebarClosed && <div className="explorerFieldSelector">{LeftSideBar}</div>}
          <EuiButtonIcon
            iconType={isSidebarClosed ? 'menuRight' : 'menuLeft'}
            iconSize="m"
            size="s"
            onClick={() => {
              setIsSidebarClosed((staleState) => {
                return !staleState;
              });
            }}
            data-test-subj="collapseSideBarButton"
            aria-controls="discover-sidebar"
            aria-expanded={isSidebarClosed ? 'false' : 'true'}
            aria-label="Toggle sidebar"
            className="dscCollapsibleSidebar__collapseButton"
          />
        </div>
        <div className={`dscWrapper ${mainSectionClassName}`}>
          {explorerData && !isEmpty(explorerData.jsonData) ? (
            <div className="dscWrapper__content">
              <div className="dscResults">
                {countDistribution?.data && !isLiveTailOn && (
                  <>
                    <EuiFlexGroup justifyContent="center" alignItems="center">
                      <EuiFlexItem grow={false}>{HitsCounter}</EuiFlexItem>
                      <EuiFlexItem grow={false}>{TimechartHeader}</EuiFlexItem>
                    </EuiFlexGroup>
                    {CountDistribution}
                    <EuiHorizontalRule margin="xs" />
                    {LogPatternHeader}
                    <EuiHorizontalRule margin="xs" />
                    {PatternsTable}
                  </>
                )}
                <section
                  className="dscTable dscTableFixedScroll"
                  aria-labelledby="documentsAriaLabel"
                >
                  <h2 className="euiScreenReaderOnly" id="documentsAriaLabel">
                    <FormattedMessage id="discover.documentsAriaLabel" defaultMessage="Documents" />
                  </h2>
                  <div className="dscDiscover">
                    {LiveTailView}
                    {countDistribution?.data && (
                      <EuiTitle size="s">
                        <h3 style={{ margin: '0px', textAlign: 'left', marginLeft: '10px' }}>
                          Events
                          <span className="event-header-count">
                            {' '}
                            (
                            {reduce(
                              countDistribution.data['count()'],
                              (sum, n) => {
                                return sum + n;
                              },
                              0
                            )}
                            )
                          </span>
                        </h3>
                      </EuiTitle>
                    )}
                    <EuiHorizontalRule margin="xs" />
                    {EventView}
                    <a tabIndex={0} id="discoverBottomMarker">
                      &#8203;
                    </a>
                  </div>
                </section>
              </div>
            </div>
          ) : (
            <NoResults />
          )}
        </div>
      </div>
    </main>
  );
};
