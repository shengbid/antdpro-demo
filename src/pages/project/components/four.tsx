import { Button } from 'antd'
import React, { useState } from 'react'
import { connect } from 'dva'

const Project4: React.Fc = (props: {onSuccess: (name: string) => void, dispatch: any}) => {
  const [name, setName] = useState('')

  const clickName = () => {
    setName(`小明${Math.floor(Math.random()*10)}`)
    props.onSuccess(name)
    props.dispatch({
      type: 'project/changeState',
      payload: name,
    })
  }

  return <div>
    项目第四层组件
    <div>姓名: {name}</div>
    <Button type="primary" onClick={clickName}>更换</Button>
  </div>
}

export default connect(({ project }) => ({
  project,
}))(Project4)