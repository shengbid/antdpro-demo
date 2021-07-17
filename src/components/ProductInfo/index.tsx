import React, { useEffect, forwardRef, useImperativeHandle } from 'react'
import { Form, Input, Select, 
  Row, Col, DatePicker } from 'antd'
import moment from 'moment'

const { Option } = Select
const { TextArea } = Input

const dateFormat = 'YYYY-MM-DD'

export type productProps = {
  infoData?: any
}

const formInput = ({infoData}: productProps, ref: any) => {
  const [form] = Form.useForm()

  // 暴露组件的方法
  useImperativeHandle(ref, () => ({
    getForm: () => {
      return form
    }
  }))

 useEffect(() => {
   if (infoData) {
    form.setFieldsValue({...infoData,
      establishedTime: moment(infoData.establishedTime)})
  }
 }, [])

  const companyOptions = [
    {
      companyName: '大米科技有限公司',
      id: 1,
      companyCode: '1273883',
      desc: '这个公司非常棒',
      establishedTime: '2020-09-28'
    },
    {
      companyName: '大米科技有限公司2',
      id: 2,
      companyCode: '2273883',
      desc: '这个公司非常棒2',
      establishedTime: '2011-09-09'
    },
    {
      companyName: '大米科技有限公司3',
      id: 3,
      companyCode: '2273883',
      desc: '这个公司非常棒3',
      establishedTime: '2018-08-18'
    }
  ]

  // 根据选择公司进行回填
  const changeCompany = (val, option) => {
    console.log(option)
    form.setFieldsValue({
      ...option, 
      establishedTime: moment(option.establishedtime)
    })
  }
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
      >
        <Row justify="space-between">
          <Col span={7}>
            <Form.Item 
              label="公司名称" 
              name="companyId"
              rules={[{required: true, message: '请选择公司名称'}]}>
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择公司名称"
                onChange={changeCompany}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {companyOptions.map(item => 
                  <Option 
                  key={item.id} 
                  value={item.id}
                  companyCode={item.companyCode}
                  establishedtime={item.establishedTime}
                  desc={item.desc}
                  >{item.companyName}</Option>
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item 
              label="公司编号" 
              name="companyCode"
              rules={[{required: true, message: '请输入公司编号'}]}>
              <Input disabled placeholder="请输入公司编号" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item 
              label="公司成立时间" 
              name="establishedTime"
              rules={[{required: true, message: '请输入公司成立时间'}]}>
              <DatePicker style={{width: '100%'}} format={dateFormat} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="公司描述" 
              name="desc"
              rules={[{required: true, message: '请输入公司描述'}]}>
              <TextArea
                placeholder="请输入公司描述"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

// 通过forwardRef传递
export default forwardRef(formInput)