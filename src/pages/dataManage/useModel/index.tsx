// import React from 'react'
import Page1 from './componenets/page1'
import Page2 from './componenets/page2'
import Page3 from './componenets/page3'

export default () => {
  
  return <>
    <h2>useModel数据管理</h2>
    <div style={{backgroundColor: '#fff', marginTop: '20px', padding: '10px'}}>
      <Page1 />
    </div>
    <div style={{backgroundColor: '#fff', marginTop: '20px', padding: '10px'}}>
      <Page2 />
    </div>
    <div style={{backgroundColor: '#fff', marginTop: '20px', padding: '10px'}}>
      <Page3 />
    </div>
  </>
};