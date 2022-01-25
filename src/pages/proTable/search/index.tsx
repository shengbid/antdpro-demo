import { useRef, useState } from 'react';
import { PlusOutlined, EllipsisOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Menu, Dropdown, Row, Col, Select, Switch } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import type { BaseQueryFilterProps, ProFormInstance } from '@ant-design/pro-form';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import { omit } from 'lodash';

const { Option } = Select;

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    hideInSearch: true,
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '很长很长很长的标题',
    dataIndex: 'title',
    hideInTable: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    valueType: 'select',
    // initialValue: 'all',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => (
      <Space>
        {record.labels.map(({ name, color }) => (
          <Tag color={color} key={name}>
            {name}
          </Tag>
        ))}
      </Space>
    ),
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '金额',
    dataIndex: 'number',
    valueType: 'digit',
  },
  {
    title: '用户',
    dataIndex: 'user',
  },
  {
    title: '搜索项',
    dataIndex: 'age',
    hideInTable: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const menu = (
  <Menu>
    <Menu.Item key="1">1st item</Menu.Item>
    <Menu.Item key="2">2nd item</Menu.Item>
    <Menu.Item key="3">3rd item</Menu.Item>
  </Menu>
);

export default () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();
  const [searchOption, setSearchOption] = useState<BaseQueryFilterProps>({});

  // 改变labelwidth宽度
  const changeLabel = (value: number | 'auto') => {
    setSearchOption({
      ...searchOption,
      labelWidth: value,
    });
  };
  // 改变每行formitem个数 ,后面的重置,查询也算一列
  const changeSpan = (value: number) => {
    setSearchOption({
      ...searchOption,
      span: value,
    });
  };
  // 改变折叠状态
  const changeCollapsed = (value: boolean) => {
    setSearchOption({
      ...searchOption,
      collapsed: value,
    });
  };
  // 改变查询按钮文本
  const changeText = (value: string) => {
    setSearchOption({
      ...searchOption,
      searchText: value,
    });
  };
  // 自定义搜索操作
  const changeOptionRender = (value: boolean) => {
    if (value) {
      setSearchOption({
        ...searchOption,
        optionRender: ({ searchText }, { form }) => {
          // console.log(searchConfig, formProps, dom)
          return [
            <Button
              key="reset"
              icon={<RedoOutlined />}
              onClick={() => {
                form?.resetFields();
                // actionRef?.current?.reload()
              }}
            >
              重置
            </Button>,
            <Button
              key="sub"
              icon={<SearchOutlined />}
              onClick={() => {
                form?.submit();
              }}
            >
              {searchText}
            </Button>,
            <Button key="out" onClick={() => console.log(6668)}>
              导出
            </Button>,
          ];
        },
      });
    } else {
      setSearchOption(omit(searchOption, 'optionRender'));
    }
  };
  // 设置form值
  const changeTitle = (value: string) => {
    if (value === '设置标题和金额值') {
      formRef?.current?.setFieldsValue({
        title: value,
        number: 800,
      });
    } else {
      formRef?.current?.setFieldsValue({
        title: value,
      });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', padding: '24px', backgroundColor: '#fff' }}>
        <h3>改变属性</h3>
        <Row gutter={16} style={{ padding: '8px 0' }}>
          <Col className="gutter-row" span={6}>
            labelWidth:
            <Select defaultValue={80} style={{ width: 120 }} onChange={changeLabel}>
              <Option value={80}>80px</Option>
              <Option value={120}>120px</Option>
              <Option value="auto">auto</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={6}>
            span:
            <Select defaultValue={6} style={{ width: 120 }} onChange={changeSpan}>
              <Option value={6}>每行展示3个</Option>
              <Option value={8}>每行展示2个</Option>
              <Option value={12}>每行展示1个</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={6}>
            是否折叠:
            <Switch defaultChecked onChange={changeCollapsed} />
          </Col>
          <Col className="gutter-row" span={6}>
            searchText:
            <Select defaultValue={'查询'} style={{ width: 120 }} onChange={changeText}>
              <Option value="查询">查询</Option>
              <Option value="确定">确定</Option>
              <Option value="提交">提交</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16} style={{ padding: '8px 0' }}>
          <Col className="gutter-row" span={6}>
            设置表单值:
            <Select defaultValue={'清空'} style={{ width: 120 }} onChange={changeTitle}>
              <Option value="清空">清空</Option>
              <Option value="设置的标题一">设置的标题一</Option>
              <Option value="设置标题和金额值">设置标题和金额值</Option>
            </Select>
          </Col>
          <Col className="gutter-row" span={6}>
            是否自定义搜索操作:
            <Switch onChange={changeOptionRender} />
          </Col>
        </Row>
      </div>
      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => {
          return request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          });
        }}
        // editable={{
        //   type: 'multiple',
        // }}
        // columnsState={{
        //   persistenceKey: 'pro-table-singe-demos',
        //   persistenceType: 'localStorage',
        // }}
        rowKey="id"
        search={{ ...searchOption }}
        formRef={formRef}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            console.log(6666, values);
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown key="menu" overlay={menu}>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </div>
  );
};
