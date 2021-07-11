import React, { useRef } from 'react'
import ProductInfo from '@/components/ProductInfo'
import { Button, Collapse } from 'antd'
import { history, useLocation } from 'umi'

const { Panel } = Collapse

const formInput = (props: any) => {
  const params = useLocation()
  console.log(props)
  console.log(params) 
  // hash: ""
  // key: "inw4iu"
  // pathname: "/product/add"
  // query: {name: "跳转的参数"}
  // search: "name=%E8%B7%B3%E8%BD%AC%E7%9A%84%E5%8F%82%E6%95%B0"

  const childRef = useRef<any>()

  // 保存
  const onSave = async() => {
    // 获取子组件数据
    const childForm = childRef.current.getForm()
    await childForm.validateFields()
    const data = childForm.getFieldsValue()
    console.log(data)
  }

  return (
    <div>
      <p>
      <Button type="primary" onClick={()=>{
        history.goBack()
      }}>返回 </Button>
      </p>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="公司信息" key="1">
          {/*子组件  */}
          <ProductInfo ref={childRef} />
        </Panel>
        <Panel header="产品信息" key="2">
          
        </Panel>
        <Panel header="业务信息" key="3">
          
        </Panel>
      </Collapse>
      <p style={{marginTop: '15px'}}>
        <Button type="primary" onClick={onSave}>保存 </Button>
      </p>
    </div>
  )
}

export default formInput