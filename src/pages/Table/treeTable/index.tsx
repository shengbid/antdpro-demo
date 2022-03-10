import React, { useState, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { getCityList, getAreaList, getProvinces } from '@/services/citylist';
import { isEmpty } from 'lodash';

const TreeTable: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [tableData2, setTableData2] = useState<any[]>([]);

  const colums: any[] = [
    {
      title: '省份',
      dataIndex: 'province',
      width: '20%',
      render: (val: string, recored: any) => {
        if (recored.city) return '-';
        return val;
      },
    },
    {
      title: '市区',
      dataIndex: 'city',
      width: '20%',
      render: (val: string, recored: any) => {
        if (recored.area) return '-';
        return val;
      },
    },
    {
      title: '区县',
      width: '20%',
      dataIndex: 'area',
    },
    {
      title: 'GDP(亿)',
      width: '19%',
      dataIndex: 'gdp',
      valueType: 'digit',
    },
    {
      title: '排名',
      width: '18%',
      dataIndex: 'rank',
    },
  ];

  const colums2 = [
    {
      title: '',
      dataIndex: 'gdp',
      width: 45,
      render: () => '',
    },
    ...colums,
  ];

  // 获取表格数据
  const getData = () => {
    setTableData([
      {
        id: 1,
        province: '广东省',
        city: '',
        area: '',
        gdp: 7999,
      },
      {
        id: 2,
        province: '浙江省',
        city: '',
        area: '',
        gdp: 6990,
      },
      {
        id: 3,
        province: '江苏省',
        city: '',
        area: '',
        gdp: 5990,
      },
      {
        id: 4,
        province: '北京市',
        city: '',
        area: '',
        gdp: 8990,
      },
      {
        id: 5,
        province: '上海市',
        city: '',
        area: '',
        gdp: 8999,
      },
    ]);
  };

  useEffect(() => {
    getData();
  }, []);

  // 市渲染
  const provinceRender = (record: any) => {
    // 如果表格数据没变化,不会重新调接口,这里不需要再判断是否有值
    // 获取城市数据
    const getCitys = async () => {
      const res = await getCityList(record.province);
      return {
        data: res,
      };
    };

    // 区渲染
    const cityRender = (row: any) => {
      // 获取区数据
      const getAreas = async () => {
        const res = await getAreaList(row);
        return {
          data: res,
        };
      };

      return (
        <ProTable
          bordered
          columns={colums2}
          rowKey="id"
          search={false}
          request={getAreas}
          pagination={false}
          toolBarRender={false}
          showHeader={false}
        />
      );
    };

    return (
      <ProTable
        bordered
        columns={colums}
        rowKey="id"
        search={false}
        request={getCitys}
        expandable={{
          expandedRowRender: cityRender,
          // expandedRowKeys: cityRowKeys,
          // onExpandedRowsChange: cityExpandedRowsChange
        }}
        pagination={false}
        toolBarRender={false}
        showHeader={false}
      />
    );
  };

  // 获取树形数据
  const getData2 = async () => {
    const res: any = await getProvinces();

    setTableData2(res);
  };

  // 点击展开
  const areaExpandedRowsChange = async (expanded: boolean, record: any) => {
    console.log(expanded, record);
    if (expanded && record.children && isEmpty(record.children)) {
      if (record.level === 1) {
        const res = await getCityList(record.province, 1);
        setTableData2(
          tableData2.map((item: any) => {
            if (item.id === record.id) {
              return {
                ...item,
                children: res,
              };
            }
            return item;
          }),
        );
      } else if (record.level === 2) {
        const res = await getAreaList(record);
        setTableData2(
          tableData2.map((item: any) => {
            const obj = {
              ...item,
            };
            if (item.id === record.parentId) {
              item.children.forEach((ss: any) => {
                if (ss.id === record.id) {
                  ss.children = res;
                }
              });
            }
            return obj;
          }),
        );
      }
    }
  };

  useEffect(() => {
    getData2();
  }, []);

  return (
    <div>
      <h2>Table 树形数据的展示, children数据异步获取</h2>
      <p>antd 的table和 ant-pro 的Protable都是一样的用法</p>
      <p>点击展开按钮调接口获取数据, 放到expandedRowRender中</p>
      <ProTable
        bordered
        columns={colums}
        rowKey="id"
        search={false}
        dataSource={tableData}
        expandable={{
          expandedRowRender: provinceRender,
          // expandedRowKeys: provinceRowKeys, // 如果需要筛选, 每次调用接口时将展开项收起,需要将expandedRowKeys属性设为可控,
          // onExpandedRowsChange: provinceExpandedRowsChange
        }}
        pagination={false}
        toolBarRender={false}
      />
      <div style={{ height: '20px' }} />
      <p>点击展开按钮调接口获取数据, 修改table数据</p>
      <ProTable
        bordered
        columns={colums}
        rowKey="id"
        search={false}
        dataSource={tableData2}
        expandable={{
          onExpand: areaExpandedRowsChange,
        }}
        pagination={false}
        toolBarRender={false}
      />
    </div>
  );
};

export default TreeTable;
