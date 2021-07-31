import React from 'react'
import Project4 from './four'

const Project3: React.Fc = (props: {onSuccess: (name: string) => void}) => {

  return <div>
    项目第三层组件
    <Project4 onSuccess={(name: string)=> {
      props.onSuccess(name)
    }}></Project4>
  </div>
}

export default Project3