// import React from 'react';
import { useModel } from 'umi';
import { Descriptions, Form, Input, Button, Row, Col } from 'antd';

export default () => {
  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
  
  console.log(initialState)
  const { currentUser } = initialState

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setInitialState({...initialState, currentUser: values})
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }

  return <>
    <h2>页面一</h2>
    <Descriptions title="登陆信息">
      <Descriptions.Item label="UserName">{currentUser.name}</Descriptions.Item>
      <Descriptions.Item label="Telephone">{currentUser.phone}</Descriptions.Item>
      <Descriptions.Item label="group">{currentUser.group}</Descriptions.Item>
      <Descriptions.Item label="signature">{currentUser.signature}</Descriptions.Item>
      <Descriptions.Item label="Address">
      {currentUser.address}
      </Descriptions.Item>
    </Descriptions>
    <h2>修改初始数据</h2>
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={currentUser}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={24}>
      <Col span={8}>
        <Form.Item
          label="Username"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={8}>
      <Form.Item
        label="Telephone"
        name="phone"
        rules={[{ required: true, message: 'Please input your Telephone!' }]}
      >
        <Input />
      </Form.Item>
      </Col>

      <Col span={8}>
      <Form.Item
        label="group"
        name="group"
        rules={[{ required: true, message: 'Please input your group!' }]}
      >
        <Input />
      </Form.Item>
      </Col>

      <Col span={8}>
      <Form.Item
        label="signature"
        name="signature"
        rules={[{ required: true, message: 'Please input your signature!' }]}
      >
        <Input />
      </Form.Item>
      </Col>

      <Col span={8}>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
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
  </>
};