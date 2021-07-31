import React from 'react'
import Project3 from './three'
import { Descriptions } from 'antd'
import { connect } from 'dva'

const Project2: React.Fc = (props:any) => {
  const { useInfo } = props
  
  return <div style={{padding: '20px'}}>
    <Descriptions title="项目第二层组件">
      <Descriptions.Item label="姓名">{useInfo.userName}</Descriptions.Item>
      <Descriptions.Item label="年龄">{useInfo.age}</Descriptions.Item>
    </Descriptions>
    <Project3 />
  </div>
}

export default connect(({ user }) => ({
  useInfo: user.useInfo,
}))(Project2)