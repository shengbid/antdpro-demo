import { Request, Response } from 'express';
import Mock from 'mockjs';
const Random = Mock.Random;

const mapData = (req: Request, res: Response) => {
  const num = () => Random.integer(800, 5000);
  res.send({
    data: [
      {
        name: '北京市',
        code: 110000,
        vlaue: num(),
      },
      {
        name: '天津市',
        code: 120000,
        vlaue: num(),
      },
      {
        name: '河北省',
        code: 130000,
        vlaue: num(),
      },
      {
        name: '山西省',
        code: 140000,
        vlaue: num(),
      },
      {
        name: '内蒙古自治区',
        code: 150000,
        vlaue: num(),
      },
      {
        name: '辽宁省',
        code: 210000,
        vlaue: num(),
      },
      {
        name: '吉林省',
        code: 220000,
        vlaue: num(),
      },
      {
        name: '黑龙江省',
        code: 230000,
        vlaue: num(),
      },
      {
        name: '上海市',
        code: 310000,
        vlaue: num(),
      },
      {
        name: '江苏省',
        code: 320000,
        vlaue: num(),
      },
      {
        name: '浙江省',
        code: 330000,
        vlaue: num(),
      },
      {
        name: '安徽省',
        code: 340000,
        vlaue: num(),
      },
      {
        name: '福建省',
        code: 350000,
        vlaue: num(),
      },
      {
        name: '江西省',
        code: 360000,
        vlaue: num(),
      },
      {
        name: '山东省',
        code: 370000,
        vlaue: num(),
      },
      {
        name: '河南省',
        code: 410000,
        vlaue: num(),
      },
      {
        name: '湖北省',
        code: 420000,
        vlaue: num(),
      },
      {
        name: '湖南省',
        code: 430000,
        vlaue: num(),
      },
      {
        name: '广东省',
        code: 440000,
        vlaue: num(),
      },
      {
        name: '广西壮族自治区',
        code: 450000,
        vlaue: num(),
      },
      {
        name: '海南省',
        code: 460000,
        vlaue: num(),
      },
      {
        name: '重庆市',
        code: 500000,
        vlaue: num(),
      },
      {
        name: '四川省',
        code: 510000,
        vlaue: num(),
      },
      {
        name: '贵州省',
        code: 520000,
        vlaue: num(),
      },
      {
        name: '西藏自治区',
        code: 540000,
        vlaue: num(),
      },
      {
        name: '陕西省',
        code: 610000,
        vlaue: num(),
      },
      {
        name: '甘肃省',
        code: 620000,
        vlaue: num(),
      },
      {
        name: '青海省',
        code: 630000,
        vlaue: num(),
      },
      {
        name: '宁夏回族自治区',
        code: 640000,
        vlaue: num(),
      },
      {
        name: '新疆维吾尔自治区',
        code: 650000,
        vlaue: num(),
      },
      {
        name: '香港特别行政区',
        code: 810000,
        vlaue: num(),
      },
      {
        name: '澳门特别行政区',
        code: 820000,
        vlaue: num(),
      },
      {
        name: '台湾省',
        code: 710000,
        vlaue: num(),
      },
    ],
    success: true,
  });
};

export default {
  'GET /api/map/data': mapData,
};
