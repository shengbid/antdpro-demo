// 异步获取城市数据
export const getCityList = (name: string) => {
  const cityList = {
    '广东省': [
      {
        id: 11,
        province: '广东省',
        city: '深圳市',
        area: '',
        gdp: 999
      },
      {
        id: 12,
        province: '广东省',
        city: '广州市',
        area: '',
        gdp: 999
      }
    ],
    '浙江省': [
      {
        id: 21,
        province: '浙江省',
        city: '杭州市',
        area: '',
        gdp: 799
      },
      {
        id: 22,
        province: '浙江省',
        city: '温州市',
        area: '',
        gdp: 699
      }
    ],
    '江苏省': [
      {
        id: 31,
        province: '江苏省',
        city: '苏州市',
        area: '',
        gdp: 799
      },
      {
        id: 32,
        province: '江苏省',
        city: '扬州市',
        area: '',
        gdp: 699
      }
    ],
    '北京市': [
      {
        id: 41,
        province: '北京市',
        city: '东城区',
        area: '',
        gdp: 899
      },
      {
        id: 42,
        province: '北京市',
        city: '西城区',
        area: '',
        gdp: 999
      }
    ],
    '上海市': [
      {
        id: 41,
        province: '上海市',
        city: '静安区',
        area: '',
        gdp: 899
      },
      {
        id: 42,
        province: '上海市',
        city: '黄埔区',
        area: '',
        gdp: 999
      }
    ]
  }
  return new Promise((resolve, reject) => {
    if (name) {
      resolve(cityList[name])
    } else {
      reject(new Error('名称不能为空'))
    }
  })
}