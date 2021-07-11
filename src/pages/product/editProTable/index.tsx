import React, { useState, useEffect } from 'react'
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import ProField from '@ant-design/pro-field';
import ProCard from '@ant-design/pro-card';
import { Button, Form } from 'antd';

type DataSourceType = {
  id: React.Key;
  title?: string;
  decs?: string;
  state?: string;
  created_at?: string;
  fileList?: any[]
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
    fileList: [{
      fileName: '这是一个测试图片',
      url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2109030888,3411151480&fm=26&gp=0.jpg'
    }]
  },
];

const EditTable: React.Fc = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);

  const [ editForm ] = Form.useForm()

  const getTableInfo = () => {
    const newData = [
      {
        id: 624748504,
        title: '活动名称一',
        decs: '这个活动真好玩',
        state: 'open',
        created_at: '2020-05-26T09:42:56Z',
        fileList: [{
          uid: '1',
          fileName: '这是一个测试图片',
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2109030888,3411151480&fm=26&gp=0.jpg'
        }]
      },
      {
        id: 624691229,
        title: '',
        decs: '这个活动真好玩',
        state: 'closed',
        created_at: '2020-05-26T08:19:22Z',
        fileList: []
      },
    ]
    setEditableRowKeys(newData.map(item => item.id))
    setDataSource(newData)
  }

  useEffect(() => {
    getTableInfo()
  }, [])
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '30%',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
          {
            max: 16,
            whitespace: true,
            message: '最长为 16 位',
          },
          {
            min: 2,
            whitespace: true,
            message: '最小为 2 位',
          },
        ],
      },
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必选项',
          },
        ]
      },
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
    },
    {
      title: '文件',
      dataIndex: 'fileList',
      editable: false,
      render: (val: any) => {
        return <div>
          {val !== '-' && val.length ? val.map(item => 
            <div key={item.uid} style={{width: '100px', height: '50px', overflow: 'hidden'}}>
              <img style={{width: '100%'}} src={item.url} />
            </div>) : ''}
        </div>
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];


  return <div>
    <EditableProTable<DataSourceType>
        headerTitle="可编辑表格"
        columns={columns}
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: 'dataSource',
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={async() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource);
                await editForm.validateFields()
              }}
            >
              保存数据
            </Button>,
          ];
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          form: editForm,
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete];
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProField
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
  </div>
}

export default EditTable