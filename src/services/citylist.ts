const sencondeNams = ['北京市', '天津市', '上海市', '重庆市', '香港特别行政区', '澳门特别行政区'];

// 异步获取城市数据
export const getCityList = (name: string, level?: number) => {
  const cityList = {
    广东省: [
      {
        id: 11,
        parentId: 1,
        level: 2,
        province: '广东省',
        city: '深圳市',
        area: '',
        gdp: 999,
      },
      {
        id: 12,
        parentId: 1,
        level: 2,
        province: '广东省',
        city: '广州市',
        area: '',
        gdp: 999,
      },
    ],
    浙江省: [
      {
        id: 21,
        parentId: 2,
        level: 2,
        province: '浙江省',
        city: '杭州市',
        area: '',
        gdp: 799,
      },
      {
        id: 22,
        parentId: 2,
        level: 2,
        province: '浙江省',
        city: '温州市',
        area: '',
        gdp: 699,
      },
    ],
    江苏省: [
      {
        id: 31,
        parentId: 3,
        level: 2,
        province: '江苏省',
        city: '苏州市',
        area: '',
        gdp: 799,
      },
      {
        id: 32,
        parentId: 3,
        level: 2,
        province: '江苏省',
        city: '扬州市',
        area: '',
        gdp: 699,
      },
    ],
    北京市: [
      {
        id: 41,
        parentId: 4,
        level: 2,
        province: '北京市',
        city: '东城区',
        area: '',
        gdp: 899,
      },
      {
        id: 42,
        parentId: 4,
        level: 2,
        province: '北京市',
        city: '西城区',
        area: '',
        gdp: 999,
      },
    ],
    上海市: [
      {
        id: 51,
        parentId: 5,
        level: 2,
        province: '上海市',
        city: '静安区',
        area: '',
        gdp: 899,
      },
      {
        id: 52,
        parentId: 5,
        level: 2,
        province: '上海市',
        city: '黄埔区',
        area: '',
        gdp: 999,
      },
    ],
  };
  return new Promise((resolve, reject) => {
    if (name) {
      if (level) {
        resolve(
          cityList[name].map((item: any) => {
            return {
              ...item,
              children: sencondeNams.includes(name) ? null : [],
            };
          }),
        );
      } else {
        resolve(cityList[name]);
      }
    } else {
      reject(new Error('名称不能为空'));
    }
  });
};

// 获取区县数据
export const getAreaList = (city: any) => {
  const list: any[] = [];
  for (let i = 1; i < 5; i += 1) {
    list.push({
      id: `${city.id}${i}`,
      province: city.province,
      city: city.city,
      area: `区县${i}`,
      gdp: Math.floor(Math.random() * 1000),
    });
  }

  return new Promise((resolve, reject) => {
    if (city) {
      if (sencondeNams.includes(city.province)) {
        resolve([]);
      } else {
        resolve(list);
      }
    } else {
      reject(new Error('名称不能为空'));
    }
  });
};

// 获取三级区域数据
export const getProvinces = () => {
  const citys = [
    {
      id: 1,
      level: 1,
      province: '广东省',
      city: '',
      area: '',
      gdp: 7999,
    },
    {
      id: 2,
      level: 1,
      province: '浙江省',
      city: '',
      area: '',
      gdp: 6990,
    },
    {
      id: 3,
      level: 1,
      province: '江苏省',
      city: '',
      area: '',
      gdp: 5990,
    },
    {
      id: 4,
      level: 1,
      province: '北京市',
      city: '',
      area: '',
      gdp: 8990,
    },
    {
      id: 5,
      level: 1,
      province: '上海市',
      city: '',
      area: '',
      gdp: 8999,
    },
  ];

  const arr = citys.map((item) => {
    return {
      ...item,
      children: [],
    };
  });
  return new Promise((resolve) => {
    resolve(arr);
  });
};
