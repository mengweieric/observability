/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { isEmpty } from 'lodash';
import { Visualization } from './visualization';
import { Timeseries } from './timeseries';

const VIS_KEYS = {
  DEFAULT_VIS: 'default',
  TIMESERIES: 'timeseries',
};

export class VisualizationRenderer {
  private readonly visualizationsMap = {
    [VIS_KEYS.DEFAULT_VIS]: (data: any, metadata: any, type: string) =>
      new Visualization(data, metadata, type),
    [VIS_KEYS.TIMESERIES]: (visdata: any) => new Timeseries(visdata),
  };

  constructor(private data: any, private metadata: any = {}) {}

  render() {
    return this.getVisualization(this.metadata.type).render();
  }

  getVisualization(type: string) {
    if (isEmpty(type))
      return this.visualizationsMap[VIS_KEYS.DEFAULT_VIS](
        this.data,
        this.metadata,
        this.metadata.type
      );

    return this.visualizationsMap[type]({
      data: this.data,
      metadata: this.metadata,
      type: this.metadata.type,
    });
  }
}
