import React, { useRef, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import type { ActionType } from '@ant-design/pro-table';
import { Button, Space, Form } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

type DataSourceType = {
  id: React.Key;
  title?: string;
  labels?: {
    key: string;
    label: string;
  }[];
  state?: string;
  area?: string;
  created_at?: string;
  children?: DataSourceType[];
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    labels: [{ key: 'woman', label: '川妹子' }],
    area: '',
    state: 'open',
    created_at: '2020-05-26T09:42:56Z',
  },
  {
    id: 624691229,
    title: '活动名称二',
    state: 'closed',
    area: '',
    created_at: '2020-05-26T08:19:22Z',
  },
];

const columns: ProColumns<DataSourceType>[] = [
  {
    title: '活动名称',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '状态',
    key: 'state',
    dataIndex: 'state',
    valueType: 'select',
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
    title: '地区',
    dataIndex: 'area',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '20%',
  },
  {
    title: '操作',
    valueType: 'option',
    align: 'center',
    width: 150,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [dataSource, setDataSource] = useState<DataSourceType[]>(defaultData);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => 
    defaultData.map(item => item.id)
  );
  const [form] = Form.useForm();

  // 提交表单
  const submit = async() => {
    await form.validateFields()
    console.log(dataSource)
  }
  return (
    <>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            // actionRef.current?.addEditRecord?.({
            //   id: (Math.random() * 1000000).toFixed(0),
            //   title: '新的一行',
            // });
            const arr = dataSource.concat([{
              id: Date.now(),
              title: '',
              state: 'closed',
              area: '',
              created_at: '2020-05-26T08:19:22Z',
            }])
            setDataSource(arr)
            setEditableRowKeys(() => 
              arr.map(item => item.id)
            )
          }}
          icon={<PlusOutlined />}
        >
          新建一行
        </Button>
        <Button
          key="rest"
          onClick={() => {
            const arr = dataSource.map(item => {
              const obj: DataSourceType = {
                id: Math.floor(Math.random() *100)
              }
              Object.keys(item).map(key => {
                if (key !== 'id')
                obj[key] = ''
              })
              return obj
            })
            console.log(arr)
            setDataSource(arr)
            setEditableRowKeys(() => 
              arr.map(item => item.id)
            )
          }}
        >
          重置表单
        </Button>
      </Space>

      <EditableProTable<DataSourceType>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="可编辑表格"
        maxLength={5}
        // 关闭默认的新建按钮
        recordCreatorProps={false}
        columns={columns}
        value={dataSource}
        // dataSource={dataSource}
        onChange={setDataSource}
        editable={{
          form,
          type: 'multiple',
          editableKeys,
          onValuesChange: (record, recordList) => {
            setDataSource(recordList);
          },
          onChange: setEditableRowKeys,
          deleteText: <MinusCircleOutlined style={{fontSize: '16px'}} />,
          actionRender: (row, config, dom) => {
            // console.log(row, dataSource)
            return [dom.delete]
            // return <MinusCircleOutlined style={{fontSize: '16px'}}
            //   onClick={() => {
            //     if (dataSource.length < 2) {
            //       message.warning('至少保留一条数据')
            //       return
            //     }
            //     setDataSource(() => 
            //       dataSource.filter(item => item.id !== row.id)
            //     )
            //   }}
            // />
          },
        }}
      />

      <div style={{marginTop: '10px'}}>
        <Button
          type="primary"
          onClick={submit}
        >提交</Button>
      </div>
    </>
  );
};