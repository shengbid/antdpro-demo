import React, { useState, useEffect } from 'react';
import ProTable from '@ant-design/pro-table';
import { getCityList, getAreaList } from '@/services/citylist';

const TreeTable: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);

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
          // expandedRowKeys: provinceRowKeys,
          // onExpandedRowsChange: provinceExpandedRowsChange
        }}
        pagination={false}
        toolBarRender={false}
        showHeader={false}
      />
    );
  };

  return (
    <div>
      <h2>Table 树形数据的展示, children数据异步获取</h2>
      <p>antd 的table和 ant-pro 的Protable都是一样的用法</p>
      <ProTable
        bordered
        columns={colums}
        rowKey="id"
        search={false}
        dataSource={tableData}
        expandable={{
          expandedRowRender: provinceRender,
          // expandedRowKeys: provinceRowKeys,
          // onExpandedRowsChange: provinceExpandedRowsChange
        }}
        pagination={false}
        toolBarRender={false}
      />
    </div>
  );
};

export default TreeTable;
