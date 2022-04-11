import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Card } from 'antd';
import { Link } from 'umi';

export type TableListItem = {
  key: number;
  name: string;
  createdT: string;
  creator: string;
};

const FlowList: React.FC = () => {
  const [tableData, setTableData] = useState<TableListItem[]>([]);

  const getList = () => {
    setTableData([
      {
        key: 1,
        name: '采购流程',
        creator: '张三',
        createdT: '2022-04-01',
      },
      {
        key: 2,
        name: '销售流程',
        creator: '黄思思',
        createdT: '2022-04-02',
      },
      {
        key: 3,
        name: '结算流程',
        creator: '陈小松',
        createdT: '2022-04-03',
      },
    ]);
  };

  useEffect(() => {
    getList();
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '流程名称',
      dataIndex: 'name',
    },
    {
      title: '创建人',
      dataIndex: 'creator',
    },
    {
      title: '创建时间',
      dataIndex: 'createdT',
    },
    {
      title: '操作',
      width: 120,
      render: (_, record) => <Link to={`/flowManage/add?id=${record.key}`}>查看详情</Link>,
    },
  ];

  return (
    <Card>
      <ProTable<TableListItem>
        columns={columns}
        dataSource={tableData}
        options={false}
        search={false}
        rowKey="key"
        toolBarRender={false}
      />
    </Card>
  );
};

export default FlowList;
