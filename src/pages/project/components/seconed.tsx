import React from 'react'
import Project3 from './three'

const Project2: React.Fc = (props) => {

  return <div>
    项目第二层组件
    <Project3 onSuccess={(name: string)=> {
      // console.log(2,name)
      props.onSuccess(name)
    }}></Project3>
  </div>
}

export default Project2