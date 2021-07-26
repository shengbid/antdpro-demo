import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

const spanTable = () => {
  const [tableData, setTableData] = useState<any[]>([])
  const [tableData2, setTableData2] = useState<any[]>([])

  const getTableData = () => {
    const table = [
      {
        firstType: '食品',
        children: [
          {
            secondType: '生鲜',
            children: [
              {
                name: '鲈鱼',
                number: 5000,
                price: 10
              },
              {
                name: '草鱼',
                number: 300,
                price: 8
              }
            ]
          },
          {
            secondType: '坚果',
            children: [
              {
                name: '巴旦木',
                number: 1000,
                price: 20
              },
              {
                name: '巧克力',
                number: 460,
                price: 56
              }
            ]
          }
        ]
      },
      {
        firstType: '日用',
        children: [
          {
            secondType: '家居',
            children: [
              {
                name: '刷子',
                number: 5000,
                price: 10
              },
              {
                name: '抹布',
                number: 3000,
                price: 3
              }
            ]
          },
          {
            secondType: '清洁',
            children: [
              {
                name: '洗衣液',
                number: 460,
                price: 56
              }
            ]
          }
        ]
      }
    ]

    setTableData(handleSpan(table))
    setTableData2(handleSpan(table, 2))
  }

  // 表格合并方法
  const handleSpan = (table, type = 3) => {
    const newData: any[] = []
    if (type === 2) { // 二级合并
      table.map((item, i) => {
        if (item.children && item.children.length) {
          item.children.map((ss, si) => {
            const newItem = {
              index: i + 1,
              id: Math.floor(Math.random() * 100),
              firstType: item.firstType,
              ...ss
            }

            // 二级合并的行,当前子级children的长度
            if (si === 0) {
              newItem.twoRowSpan = ss.children.length
            }

            newData.push(newItem)
          })
        }
      })
    } else { // 三级合并
      // 处理合并表格数据
      table.map((item, i) => {
        if (item.children && item.children.length) {
          item.children.map((ss, si) => {
            if (ss.children && ss.children.length) {
              ss.children.map((tt, ti) =>{
                const newItem = {
                  index: i + 1,
                  id: Math.floor(Math.random() * 100),
                  firstType: item.firstType,
                  secondType: ss.secondType,
                  ...tt
                }
                // 三级合并的行数,所有子级children的长度
                if (si === 0 && ti === 0) {
                  newItem.oneRowSpan = item.children.reduce((a, b) => {
                    // console.log(a, b)
                    return a + b.children.length
                  }, 0)
                }
                // 二级合并的行,当前子级children的长度
                if (ti === 0) {
                  newItem.twoRowSpan = ss.children.length
                }

                newData.push(newItem)
              })
            }
          })
        }
      })
    }
    console.log(newData)
    return newData
  }

  useEffect(() => {
    getTableData()
  }, [])

  const colums = [
    {
      title: '排序',
      dataIndex: 'index',
      render: (value, row) => {
        const obj = {
          children: value,
          props: {
            rowSpan: 0
          },
        };
        // 三级合并
        if (row.oneRowSpan) {
          obj.props.rowSpan = row.oneRowSpan;
        }

        return obj;
      },
    },
    {
      title: '一级分类',
      dataIndex: 'firstType',
      render: (value, row) => {
        const obj = {
          children: value,
          props: {
            rowSpan: 0
          },
        };
        // 三级合并
        if (row.oneRowSpan) {
          obj.props.rowSpan = row.oneRowSpan;
        }

        return obj;
      },
    },
    {
      title: '二级分类',
      dataIndex: 'secondType',
      render: (value, row) => {
        const obj = {
          children: value,
          props: {
            rowSpan: 0
          },
        };
        // 二级合并
        if (row.twoRowSpan) {
          obj.props.rowSpan = row.twoRowSpan;
        }
        return obj;
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '数量',
      dataIndex: 'number',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
  ]

  const colums2 = [
    {
      title: '排序',
      dataIndex: 'index',
      render: (value, row) => {
        const obj = {
          children: value,
          props: {
            rowSpan: 0
          },
        };
        if (row.twoRowSpan) {
          obj.props.rowSpan = row.twoRowSpan;
        }

        return obj;
      },
    },
    {
      title: '一级分类',
      dataIndex: 'firstType',
      render: (value, row) => {
        const obj = {
          children: value,
          props: {
            rowSpan: 0
          },
        };
        if (row.twoRowSpan) {
          obj.props.rowSpan = row.twoRowSpan;
        }

        return obj;
      },
    },
    {
      title: '二级分类',
      dataIndex: 'secondType',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '数量',
      dataIndex: 'number',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
  ]

  return (
    <div>
      <h2>动态数据表格合并</h2>
      <h3>二级合并</h3>
      <Table
        bordered
        columns={colums2}
        dataSource={tableData2}
        pagination={false}
        rowKey="id"
        expandable={{childrenColumnName:"none"}}
       />
      <h3 style={{marginTop: '15px'}}>三级合并</h3>
      <Table
        bordered
        columns={colums}
        rowKey="id"
        dataSource={tableData}
        pagination={false}
       />
    </div>
  )
}

export default spanTable