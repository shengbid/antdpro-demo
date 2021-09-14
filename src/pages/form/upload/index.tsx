import React from "react";
import { Form, Button, Card, Input, Table } from 'antd'
import ComUpload from "@/components/ComUpload";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
}

const UploadDemo: React.FC = () => {
  const [form] = Form.useForm()

  const dataSource = []
  for (let i = 0; i < 5; i++) {
    dataSource.push({
      key: i,
      name: `文件${i}`,
      fileList: [{
        fileName: `测试文件${i}`,
        fileUrl: 'http://dummyimage.com/400x300/f2cd79/FFF&text=qassj'
      }]
    })
  }

  const columns = [
    {
      title: '名称',
      dataIndex: 'name'
    },
    {
      title: '文件',
      dataIndex: 'fileList',
      render: (_: any) => (
        <ComUpload value={_} isDetail />
      )
    }
  ]


  const onFinish = async(values: any) => {
    console.log(values)
  }
  return (
    <div style={{width: '800px'}}>
      <Card title="form表单" bordered={false}>
        <Form 
          {...layout} 
          form={form} 
          onFinish={onFinish}
          initialValues={{
            attrList: [
              {fileName: '测试文件1', fileUrl: 'http://dummyimage.com/400x300/f2cd79/FFF&text=qassj'},
              {fileName: '测试文件2', fileUrl: 'http://dummyimage.com/400x300/f2cd79/FFF&text=qassj'}
            ]
          }}
        >
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="fileList" label="文件上传" rules={[{ required: true }]}>
            <ComUpload />
          </Form.Item>
          <Form.Item name="attrList" label="文件编辑" rules={[{ required: true }]}>
            <ComUpload />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card style={{marginTop: '24px'}} title="table" bordered={false}>
        <Table 
          columns={columns}
          dataSource={dataSource}
        />
      </Card>
    </div>
  )
}

export default UploadDemo