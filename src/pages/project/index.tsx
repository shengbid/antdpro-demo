import React, { useState } from 'react'
import Project2 from './components/seconed'
import { connect } from 'dva'

const Project: React.Fc = (props) => {
  const [name, setName] = useState('小李')
  console.log(props.update)

  return <div>
    项目顶层组件
    <div>
      姓名: {name}
    </div>
    <div>
      dva姓名: {props.update}
    </div>
    <Project2 onSuccess={(name) => {
      setName(name)
      console.log(999)
    }}></Project2>
  </div>
}

export default connect(({ project }) => ({
  update: project.update,
}))(Project)