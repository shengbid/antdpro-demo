import { Descriptions, Form, Input, Button, Row, Col } from 'antd'
import React from 'react'
import { connect } from 'dva'

const Project4: React.Fc = (props: any) => {
  const { useInfo } = props.user

  const onFinish = (values) => {
    
    props.dispatch({
      type: 'user/changeState',
      payload: values,
    })
  }

  return <div style={{padding: '20px'}}>
    <Descriptions title="项目第四层组件">
      <Descriptions.Item label="姓名">{useInfo.userName}</Descriptions.Item>
      <Descriptions.Item label="年龄">{useInfo.age}</Descriptions.Item>
    </Descriptions>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      initialValues={useInfo}
      onFinish={onFinish}
    >
      <Row gutter={24}>
      <Col span={12}>
        <Form.Item
          label="姓名"
          name="userName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
      <Form.Item
        label="年龄"
        name="age"
        rules={[{ required: true, message: 'Please input your age!' }]}
      >
        <Input />
      </Form.Item>
      </Col>
      </Row>
      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button type="primary" htmlType="submit">
          修改
        </Button>
      </Form.Item>
    </Form>
  </div>
}

export default connect(({ user }) => ({
  user,
}))(Project4)