import React from 'react'
import Project2 from './components/seconed'
import { connect } from 'dva'
import { Descriptions } from 'antd'

const Project: React.Fc = (props) => {
  const { useInfo } = props

  return <div style={{padding: '20px', background: '#fff'}}> 
    <div>
      <h2>嵌套组件</h2>
    <Descriptions title="项目顶层组件">
      <Descriptions.Item label="姓名">{useInfo.userName}</Descriptions.Item>
      <Descriptions.Item label="年龄">{useInfo.age}</Descriptions.Item>
    </Descriptions>
    </div>
    <Project2 />
  </div>
}

export default connect(({ user }) => ({
  useInfo: user.useInfo,
}))(Project)