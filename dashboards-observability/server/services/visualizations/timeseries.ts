/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { has, isEmpty, isEqual, forEach } from 'lodash';
import { Visualization } from './visualization';

export class Timeseries extends Visualization {
  constructor({ data, metadata, type }) {
    super(data, metadata, type);
  }

  render() {
    return this.renderTimeseries(this.data);
  }

  getXaxisFields(visMetadata) {
    return has(visMetadata, 'dimensions') &&
      isEqual(visMetadata.dimensions.length, 1) &&
      isEqual(visMetadata.dimensions[0].type, 'timestamp')
      ? visMetadata.dimensions[0].name
      : '';
  }

  getBreakdownFields(visMetadata) {
    return has(visMetadata, 'breakdowns') && !isEmpty(visMetadata.breakdowns)
      ? visMetadata.breakdowns.map((bd) => bd.name)
      : [];
  }

  getAggregationFields(visMetadata) {
    return has(visMetadata, 'series') && !isEmpty(visMetadata.series)
      ? visMetadata.series.map((sr) => sr.name)
      : [];
  }

  fillinTraces(breakdownMap) {
    const tracesRes = [];
    breakdownMap.forEach((value) => tracesRes.push(value));
    return tracesRes;
  }

  renderTimeseries(visData) {
    let traces = [];
    this.getAggregationFields(this.metadata).map((agg) => {
      const aggData = visData.data;
      const timeseriesList = aggData[this.getXaxisFields(this.metadata)];
      const breakdownList = this.getBreakdownFields(this.metadata);
      const breakDownMap = new Map<string, Array<any>>();
      forEach(timeseriesList, (time, idx) => {
        const concatBreakdownLabel = breakdownList
          .map((breakdown) => aggData[breakdown][idx])
          .join(',');
        if (isEmpty(breakDownMap.get(concatBreakdownLabel))) {
          breakDownMap.set(concatBreakdownLabel, {
            x: [time],
            y: [aggData[agg][idx]],
            name: concatBreakdownLabel,
            type: 'line',
          });
        } else {
          const curTrace = breakDownMap.get(concatBreakdownLabel);
          curTrace!.x.push(time);
          curTrace!.y.push(aggData[agg][idx]);
        }
      });
      traces = [...traces, ...this.fillinTraces(breakDownMap)];
    });

    return traces;
  }
}
