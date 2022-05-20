import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import china from '@/utils/data/china.json';
import { getMapData } from '@/services/map';
import { request } from 'umi';
import { provinces, municipalitys } from '@/utils/data/province';
import { Button } from 'antd';

const Region: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<number>(1); // 当前点击的层级
  const [secondData, setSecondData] = useState({ data: [], name: '' }); // 省级地图数据
  const [chart, setChart] = useState(null);
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
        name: '中国',
        type: 'map',
        map: 'chinamap',
        label: {
          show: false,
        },
        roam: true,
        center: null,
        zoom: 1.2,
        data: [],
      },
    ],
  });

  // 中国地图
  const getData = async (scatter: any) => {
    echarts.registerMap('chinamap', china);
    const { data } = await getMapData();
    option.series[0].name = 'chinamap';
    option.series[0].map = 'chinamap';
    option.series[0].data = data;
    scatter.setOption(option);
  };

  const getCity = (scatter: any, data: any, name: string) => {
    option.series[0].name = name;
    option.series[0].map = name;
    option.series[0].data = data;
    option.series[0].zoom = 1;
    option.series[0].center = null;
    scatter.setOption(option);
    // console.log(option)
  };

  const clickData = (scatter: any) => {
    scatter.on('click', (params: any) => {
      console.log(params);
      const { code } = params.data;
      const { name, seriesName } = params;

      const getlist = () => {
        // 台湾省没有下一级
        request('https://geo.datav.aliyun.com/areas_v3/bound/geojson', {
          params: { code: code === 710000 ? code : `${code}_full` },
        }).then((res) => {
          echarts.registerMap(name, res);
          const data: any[] = [];
          res.features.forEach((item: any) => {
            data.push({
              name: item.properties.name,
              code: item.properties.adcode,
              value: Math.floor(Math.random() * 5000),
            });
          });
          getCity(scatter, data, name);
          if (provinces.includes(name)) {
            setSecondData({
              data,
              name,
            });
          }
        });
      };

      // 点击省份
      if (provinces.includes(name)) {
        setCurrentLevel(2);
        getlist();
      } else if (!municipalitys.includes(seriesName) && provinces.includes(seriesName)) {
        // 点击市, 直辖市只到省级
        setCurrentLevel(3);
        getlist();
      }
    });

    // 点击空白处返回上一级
    scatter.getZr().on('click', function (event: any) {
      // 没有 target 意味着鼠标/指针不在任何一个图形元素上，它是从“空白处”触发的。
      if (!event.target) {
        // 点击在了空白处，做些什么。
        console.log(currentLevel, secondData);
      }
    });
  };

  // 返回上一级
  const toBack = () => {
    // console.log(currentLevel, secondData)
    if (currentLevel === 2) {
      setCurrentLevel(1);
      getData(chart);
    } else if (currentLevel === 3) {
      setCurrentLevel(2);
      getCity(chart, secondData.data, secondData.name);
    }
  };

  useEffect(() => {
    const dom = document.getElementById('myChart');
    if (dom) {
      const scatter: any = echarts.init(dom);
      setChart(scatter);
      getData(scatter);

      clickData(scatter);
    }
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        {currentLevel > 1 ? (
          <Button type="primary" onClick={toBack}>
            返回上一级
          </Button>
        ) : null}
      </div>
      <div id="myChart" style={{ width: '80%', height: '500px' }} />
    </div>
  );
};

export default Region;
