import React from "react";
import type { articleProps } from 'mock/editor'
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getArticleList } from '@/services/ant-design-pro'
import { history } from 'umi'

const EditorList: React.FC = () => {

  const columns: ProColumns<articleProps>[] = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
  ]

  const getList = async() => {
    const { data } = await getArticleList()
    return {
      data,
      total: data.length
    }
  }

  return (
    <div>
      <ProTable<articleProps>
        columns={columns}
        request={getList}
        rowKey="id"
        search={false}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="文章列表"
        toolBarRender={() => [
          <Button 
            key="button" 
            icon={<PlusOutlined />} 
            type="primary"
            onClick={()=>{
              history.push({
                pathname: '/editor/add',
                query: {
                  name: '跳转的参数'
                }
              })
            }}
          >
            新建
          </Button>,
        ]}
      />
    </div>
  )
}

export default EditorList