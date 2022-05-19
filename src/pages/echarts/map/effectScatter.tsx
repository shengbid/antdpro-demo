import React from 'react';
import * as echarts from 'echarts';
import { useEffect } from 'react';

const EffectScatter: React.FC = () => {
  const getData = (scatter: any) => {
    fetch(
      'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/Map_of_Iceland.svg',
    )
      .then((response) => response.text())
      .then((svg) => {
        echarts.registerMap('iceland_svg', { svg: svg });
        const option = {
          geo: {
            map: 'iceland_svg',
            left: 0,
            right: 0,
          },
          series: {
            type: 'custom',
            coordinateSystem: 'geo',
            geoIndex: 0,
            zlevel: 1,
            data: [
              [488, 459, 100],
              [770, 757, 30],
              [1180, 743, 80],
              [894, 1188, 61],
              [1372, 477, 70],
              [1378, 935, 81],
            ],
            renderItem(params, api) {
              const coord = api.coord([
                api.value(0, params.dataIndex),
                api.value(1, params.dataIndex),
              ]);

              const circles = [];
              for (let i = 0; i < 5; i++) {
                circles.push({
                  type: 'circle',
                  shape: {
                    cx: 0,
                    cy: 0,
                    r: 30,
                  },
                  style: {
                    stroke: 'red',
                    fill: 'none',
                    lineWidth: 2,
                  },
                  // Ripple animation
                  keyframeAnimation: {
                    duration: 4000,
                    loop: true,
                    delay: (-i / 4) * 4000,
                    keyframes: [
                      {
                        percent: 0,
                        scaleX: 0,
                        scaleY: 0,
                        style: {
                          opacity: 1,
                        },
                      },
                      {
                        percent: 1,
                        scaleX: 1,
                        scaleY: 0.4,
                        style: {
                          opacity: 0,
                        },
                      },
                    ],
                  },
                });
              }
              return {
                type: 'group',
                x: coord[0],
                y: coord[1],
                children: [
                  ...circles,
                  {
                    type: 'path',
                    shape: {
                      d: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
                      x: -10,
                      y: -35,
                      width: 20,
                      height: 40,
                    },
                    style: {
                      fill: 'red',
                    },
                    // Jump animation.
                    keyframeAnimation: {
                      duration: 1000,
                      loop: true,
                      delay: Math.random() * 1000,
                      keyframes: [
                        {
                          y: -10,
                          percent: 0.5,
                          easing: 'cubicOut',
                        },
                        {
                          y: 0,
                          percent: 1,
                          easing: 'bounceOut',
                        },
                      ],
                    },
                  },
                ],
              };
            },
          },
        };

        scatter.setOption(option);
      });
  };

  useEffect(() => {
    const dom = document.getElementById('myChart');
    console.log(dom);
    if (dom) {
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

export default EffectScatter;
