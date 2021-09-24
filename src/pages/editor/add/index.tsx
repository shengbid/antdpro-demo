import React from "react";
import { Button, message, Input } from 'antd'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { useState } from "react";
import { addArticle } from '@/services/ant-design-pro'

const AddEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))
  const [title, setTitle] = useState<string>('')

  // 值改变
  const handleEditorChange = (state: any) => {
    setEditorState(state)
  }
  // 提交
  const submitContent = async() => {
    console.log(title, editorState)
    const stateHtml = editorState.toHTML()
    const stateRaw = editorState.toRAW()
    if (title && stateHtml !== '<p></p>') {
      await addArticle({
        title,
        content: stateRaw
      })
      message.success('添加成功')
    } else {
      message.warning('请先填写标题和内容')
    }
  }

  return (
    <div>
      <p>富文本编辑</p>
      <div style={{backgroundColor: '#fff', padding: '24px'}}>
        <div style={{width: '60%', marginBottom: '15px'}}>
          <p>文章标题</p>
          <Input placeholder="请输入文章标题" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <p>文章内容</p>
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