import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import china from '@/utils/data/china.json';
import { getMapData } from '@/services/map';

const Region: React.FC = () => {
  const [option] = useState({
    title: {
      text: '行政区域地图',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)',
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    visualMap: {
      min: 800,
      max: 5000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered'],
      },
    },
    series: [
      {
        name: '行政区域地图',
        type: 'map',
        map: 'chinamap',
        label: {
          show: false,
        },
        roam: true,
        zoom: 1.2,
        data: [],
      },
    ],
  });

  const getData = async (scatter: any) => {
    const { data } = await getMapData();
    option.series[0].data = data;
    console.log(data, china);
    scatter.setOption(option);
  };

  useEffect(() => {
    const dom = document.getElementById('myChart');
    if (dom) {
      echarts.registerMap('chinamap', china);
      const scatter = echarts.init(dom);
      getData(scatter);
    }
  }, []);

  return (
    <div>
      <div id="myChart" style={{ width: '80%', height: '500px' }} />
    </div>
  );
};

export default Region;
