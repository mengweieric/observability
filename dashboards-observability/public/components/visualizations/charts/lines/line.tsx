/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { take, isEmpty, last } from 'lodash';
import { Plt } from '../../plotly/plot';
import { useCallback } from 'react';
import { useRef } from 'react';

export const Line = ({ visualizations, layout, config }: any) => {

  const {
    data = {},
    metadata: { fields },
  } = visualizations.data.rawVizData;
  const { defaultAxes } = visualizations.data;
  const { dataConfig = {}, layoutConfig = {} } = visualizations?.data?.userConfigs;
  const xaxis =
    dataConfig?.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.xaxis : [];
  const yaxis =
    dataConfig?.valueOptions && dataConfig.valueOptions.xaxis ? dataConfig.valueOptions.yaxis : [];
  const lastIndex = fields.length - 1;
  const mode =
    dataConfig?.chartOptions && dataConfig.chartOptions.mode && dataConfig.chartOptions.mode[0]
      ? dataConfig.chartOptions.mode[0].modeId
      : 'line';

  const [calculateValues, setFinalCalculatedValues] = useState(() => {
    return 
  });
  const layoutRef = useRef({});
  const [, updateChart] = useState({});

  let valueSeries;
  if (!isEmpty(xaxis) && !isEmpty(yaxis)) {
    valueSeries = [...yaxis];
  } else {
    valueSeries = defaultAxes.yaxis || take(fields, lastIndex > 0 ? lastIndex : 1);
  }
  
  let [calculatedLayout, lineValues] = useMemo(() => {
    
    let calculatedLineValues = valueSeries.map((field: any) => {
      return {
        x: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name],
        y: data[field.name],
        type: 'line',
        name: field.name,
        mode,
      };
    });
    
    const mergedLayout = {
      ...layout,
      ...layoutConfig.layout,
      title: dataConfig?.panelOptions?.title || layoutConfig.layout?.title || '',
    };

    if (dataConfig.thresholds) {
      const thresholdTraces = {
        x: [],
        y: [],
        mode: 'text',
        text: [],
      };
      mergedLayout.shapes = [
        ...dataConfig.thresholds.map((thr) => {
          thresholdTraces.x.push(
            data[!isEmpty(xaxis) ? xaxis[xaxis.length - 1]?.label : fields[lastIndex].name][0]
          );
          thresholdTraces.y.push(thr.value * (1 + 0.06));
          thresholdTraces.text.push(thr.name);
          return {
            type: 'line',
            x0: data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name][0],
            y0: thr.value,
            x1: last(data[!isEmpty(xaxis) ? xaxis[0]?.label : fields[lastIndex].name]),
            y1: thr.value,
            name: thr.name || '',
            opacity: 0.7,
            line: {
              color: thr.color,
              width: 4,
              dash: 'dashdot',
            },
          };
        }),
      ];
      calculatedLineValues = [...calculatedLineValues, thresholdTraces];
    }
    return [mergedLayout, calculatedLineValues];
  }, [data, fields, lastIndex, layout, layoutConfig, xaxis, yaxis, mode, valueSeries]);

  layoutRef.current = calculatedLayout;

  // useEffect(() => {
  //   setFinalCalculatedLayout(calculatedLayout);
  // }, [calculatedLayout]);

  const mergedConfigs = {
    ...config,
    ...(layoutConfig.config && layoutConfig.config),
  };

  const memoHandleVizClick = useCallback((event) => {
    console.log('event: ', event);
    var pts = '';
    let annotate_text = '';
    let annotations = [];
    let annotation;
    for(var i=0; i < event.points.length; i++){
        annotate_text = 'x = '+event.points[i].x +
                      'y = '+event.points[i].y.toPrecision(4);

        annotation = {
          text: annotate_text,
          x: event.points[i].x,
          y: parseFloat(event.points[i].y.toPrecision(4))
        }

        annotations = layoutRef.current.annotations || [];
        
        annotations.push(annotation);
        
    }
    layoutRef.current = {
      ...layoutRef.current,
      annotations,
    };

    console.log('layoutRef.current before layer: ', layoutRef.current);

    updateChart({});

    
  }, [layoutRef.current]);

  const finalCalculatedLayout = {
    ...layoutRef.current,
    annotations: [{text: 'x = 2022-03-23y = 236.0', x: '2022-03-23', y: 236}]
  };

  return <Plt data={lineValues} layout={finalCalculatedLayout} config={mergedConfigs} onClickHandler={memoHandleVizClick} />;
};
