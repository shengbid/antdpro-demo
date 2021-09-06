import React, { useState } from 'react'
import type { ProColumns } from '@ant-design/pro-table'
import ProTable from '@ant-design/pro-table';
import { Space } from 'antd'

export type TableListItem = {
  key: number;
  name: string;
  progress: number;
  containers: number;
  callNumber: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
}

const ProcessMap = {
  close: 'normal',
  running: 'active',
  online: 'success',
  error: 'exception',
}


const SelectTable: React.FC = () => {
const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const getTableData = (params) => {
    const arr = []
    for (let i = 0; i < 5; i += 1) {
      arr.push({
        key: `${params.current}${i}`,
        name: 'AppName',
        containers: Math.floor(Math.random() * 20),
        callNumber: Math.floor(Math.random() * 2000),
        progress: Math.ceil(Math.random() * 100) + 1,
        createdAt: Date.now() - Math.floor(Math.random() * 100000),
        memo: '简短备注文案',
      });
    }
    return {
      data: arr,
      total: 30,
      status: 'success'
    }
  }

  // 批量删除
  const batchDelete = () => {
    console.log(selectedRowKeys)
  }
  
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '应用名称',
      width: 120,
      dataIndex: 'name',
      fixed: 'left',
      render: (_) => <a>{_}</a>,
    },
    {
      title: '容器数量',
      width: 120,
      dataIndex: 'containers',
      align: 'right',
      search: false,
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: '调用次数',
      width: 120,
      align: 'right',
      dataIndex: 'callNumber',
    },
    // {
    //   title: '执行进度',
    //   dataIndex: 'progress',
    //   valueType: (item) => ({
    //     type: 'progress',
    //     status: ProcessMap[item.status],
    //   }),
    // },
    // {
    //   title: '创建者',
    //   width: 120,
    //   dataIndex: 'creator',
    //   valueType: 'select',
    //   valueEnum: {
    //     all: { text: '全部' },
    //     付小小: { text: '付小小' },
    //     曲丽丽: { text: '曲丽丽' },
    //     林东东: { text: '林东东' },
    //     陈帅帅: { text: '陈帅帅' },
    //     兼某某: { text: '兼某某' },
    //   },
    // },
    {
      title: '创建时间',
      width: 140,
      key: 'since',
      dataIndex: 'createdAt',
      valueType: 'date',
      sorter: (a, b) => a.createdAt - b.createdAt,
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'memo',
      ellipsis: true,
      copyable: true,
      search: false,
    },
    {
      title: '操作',
      width: 80,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: () => [<a key="link">链路</a>],
    },
  ];
  return (
    <>
    <p>批量选择表格数据,记住分页的数据,(记住选中数据)</p>
    <ProTable<TableListItem>
      columns={columns}
      rowSelection={{
        selectedRowKeys,
        onSelect: (record, selected) => {
          // console.log(record, selected)
          let arr = []
          if (selected) {
            arr = Array.from(new Set([...selectedRowKeys, record.key]))
          } else {
            arr = selectedRowKeys.filter(item => {
              return item !== record.key
            })
          }
          setSelectedRowKeys(arr)
        }
      }}
      tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
        <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
        </Space>
      )}
      tableAlertOptionRender={() => {
        return (
          <Space size={16}>
            <a onClick={batchDelete}>批量删除</a>
            <a>导出数据</a>
          </Space>
        );
      }}
      request={getTableData}
      scroll={{ x: 1300 }}
      options={false}
      search={false}
      rowKey="key"
      headerTitle="批量操作"
      toolBarRender={false}
    />
    </>
  )
}

export default SelectTable