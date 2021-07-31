import React from 'react'
import Project4 from './four'
import { Descriptions } from 'antd'
import { connect } from 'dva'

const Project3: React.Fc = (props:any) => {
  const { useInfo } = props

  return <div style={{padding: '20px'}}>
    
    <Descriptions title="项目第三层组件">
      <Descriptions.Item label="姓名">{useInfo.userName}</Descriptions.Item>
      <Descriptions.Item label="年龄">{useInfo.age}</Descriptions.Item>
    </Descriptions>
    <Project4 />
  </div>
}

export default connect(({ user }) => ({
  useInfo: user.useInfo,
}))(Project3)