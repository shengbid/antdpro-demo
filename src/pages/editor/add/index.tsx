import React from "react";
import { Button } from 'antd'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { useState } from "react";

const AddEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))

  // 值改变
  const handleEditorChange = (state: any) => {
    setEditorState(state)
  }
  // 提交
  const submitContent = () => {
    const stateHtml = editorState.toHTML()
    const stateRaw = editorState.toRAW()
    console.log(1,editorState, 2,stateHtml,3, stateRaw)
  }

  return (
    <div>
      <p>富文本编辑</p>
      <div style={{backgroundColor: '#fff'}}>
        <BraftEditor
          value={editorState}
          onChange={handleEditorChange}
          onSave={submitContent}
        />
      </div>
      <Button type="primary" onClick={submitContent}>
        提交
      </Button>
    </div>
  )
}

export default AddEditor