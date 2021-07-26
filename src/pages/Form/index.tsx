import React,  { useState } from "react";
import { Select, Button, Form } from 'antd'
import type { ProColumns } from '@ant-design/pro-table'
import { EditableProTable } from '@ant-design/pro-table'


const EditTable = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([])
  const [dataSource, setDataSource] = useState<any[]>([])
  const [editForm] = Form.useForm()

  const { Option } = Select
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      dataIndex: 'num',
      width: 60,
      editable: false,
      render: (_, record, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: '行业分类',
      dataIndex: 'industry',
      width: 130,
      renderFormItem: () => (
        <Select>
          <Option value="1">机械</Option>
          <Option value="2">电子</Option>
          <Option value="3">服务</Option>
          <Option value="4">其他</Option>
          <Option value="5">不可填写</Option>
        </Select>
      ),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: '产品分类',
      dataIndex: 'productType',
      width: 130,
      renderFormItem: (_, config, data) => {
        // console.log(_, config, data)
        let disabled = false
        if (!config.record || (config.record && config.record.industry === '5')) { // 如果行业未选择或者选择不可填写,产品不能选择
          disabled = true
        }
        return <Select disabled={disabled}>
          <Option value="1">必填产品1</Option>
          <Option value="2">产品2</Option>
          <Option value="3">产品3</Option>
        </Select>
      },
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
          },
        ],
      },
    },
    {
      title: '产品名称',
      width: '15%',
      dataIndex: 'productName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项是必填项',
            validator: (values) => {
              const { field } = values
              // console.log(values, field)
              // 获取当前行数据
              const current = editForm.getFieldValue(`${field.split(".")[0]}`) || {}
              if (current.productType === '1' && !current.productName) { // 如果产品分类选择必填,产品名称校验
                return Promise.reject(new Error('产品分类必填'))
              }
              return Promise.resolve()
            }
          }
        ]
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 60,
      render: (text, record) => [
        <a
          key="delete"
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id !== record.id))
          }}
        >
          删除
        </a>,
      ],
    },
  ]

  const onSave = async() => {
    await editForm.validateFields()
  }

  return (
    <div>
      <h2>可编辑表格,formItem联动验证</h2>
       <EditableProTable
          columns={columns}
          rowKey="id"
          value={dataSource}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          editable={{
            type: 'multiple',
            form: editForm,
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete]
            },
            onValuesChange: (record, recordList) => {
              setDataSource(recordList)
            },
            onChange: (editableKeyss, editableRows: any[]) => {
              setEditableRowKeys(editableKeyss)
              setDataSource(editableRows)
            },
          }}
        />
        <p style={{textAlign: 'right'}}>
          <Button type="primary" onClick={onSave}>保存</Button>
        </p>
    </div>
  )
}

export default EditTable