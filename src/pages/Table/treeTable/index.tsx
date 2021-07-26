import React, { useState, useEffect } from 'react'
import { Table, Checkbox } from 'antd'

const spanTable = () => {
  const [tableData, setTableData] = useState<any[]>([])
  const table = [
    {
      id: '1',
      name: '页面名称1',
      children: [
        {
          id: '1-1',
          name: '一级模块名称1-1',
          children: [
            {
              id: '1-1-1',
              name: '二级模块名称1',
              children: [
                {
                  id: '1-1-1-1',
                  name: '三级模块名称1',
                },
                {
                  id: '1-1-1-2',
                  name: '三级模块名称2',
                },
                {
                  id: '1-1-1-3',
                  name: '三级模块名称3',
                }
              ]
            },
            {
              id: '1-1-2',
              name: '二级模块名称1',
              children: [
                {
                  id: '1-1-2-1',
                  name: '三级模块名称1',
                },
                {
                  id: '1-1-2-2',
                  name: '三级模块名称2',
                },
                {
                  id: '1-1-2-3',
                  name: '三级模块名称3',
                }
              ]
            }
          ]
        },
        {
          id: '1-2',
          name: '一级模块名称1-2',
          children: [
            {
              id: '1-2-1',
              name: '二级模块名称1',
              children: [
                {
                  id: '1-2-1-1',
                  name: '三级模块名称1',
                },
                {
                  id: '1-2-1-2',
                  name: '三级模块名称2',
                },
                {
                  id: '1-2-1-3',
                  name: '三级模块名称3',
                }
              ]
            },
            {
              id: '1-2-2',
              name: '二级模块名称1',
              children: [
                {
                  id: '1-2-2-1',
                  name: '三级模块名称1',
                },
              ]
            }
          ]
        }
      ]
    },
    {
      id: '2',
      name: '页面名称2',
      children: [
        {
          id: '2-1',
          name: '一级模块名称2',
          children: [
            {
              id: '2-1-1',
              name: '二级模块名称2',
              children: [
                {
                  id: '2-1-1-1',
                  name: '三级模块名称1',
                },
                {
                  id: '2-1-1-2',
                  name: '三级模块名称2',
                },
                {
                  id: '2-1-1-3',
                  name: '三级模块名称3',
                }
              ]
            },
            {
              id: '2-1-2',
              name: '二级模块名称1',
              children: [
                {
                  id: '2-1-2-1',
                  name: '三级模块名称1',
                },
                {
                  id: '2-1-2-2',
                  name: '三级模块名称2',
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  const [oldTable, setOldTable] = useState<any[]>(table)

  const getTableData = () => {
    setTableData(handleSpan2(table))
  }

  // 表格合并方法
  const handleSpan2 = (table: any) => {
    const newData: any[] = []
    // 三级合并
    // 处理合并表格数据
    table.map((item, i) => {
      if (item.children && item.children.length) {
        item.children.map((ss, si) => {
          if (ss.children && ss.children.length) {
            ss.children.map((tt, ti) =>{
              tt.children.map((ff, fi) => {
                const newItem = {
                  index: i + 1,
                  // id: Math.floor(Math.random() * 100),
                  id: ff.id, // 第四级id
                  firstId: item.id, // 第一级id
                  secondId: ss.id, // 第二级id
                  threeId: tt.id, // 第三级id
                  firstindeterminate: item.indeterminate, // 第一级未全选样式
                  firstchecked: item.checked, // 第一级是否选中
                  seconddeterminate: ss.indeterminate,
                  secondtchecked: ss.checked,
                  threeindeterminate: tt.indeterminate,
                  threechecked: tt.checked,
                  checked: ff.checked,
                  name: item.name,
                  firstType: ss.name,
                  secondType: tt.name,
                  threeType: ff.name
                }
                // 四级合并的行数,所有子级children的长度, 第一列,层级4
                if (fi === 0 && si === 0 && ti === 0) {
                  let len = 0
                  const reducer = (arr: any) => {
                    arr.map((item, i) => {
                      if (item.children) {
                        reducer(item.children)
                      } else {
                        if (i === 0) {
                          len += arr.length
                        }
                      }
                    })
                    return len
                  }
                  newItem.fourRowSpan = reducer(item.children)
                }
                // 三级合并的行数,当前item所有子级children的长度, 第二列, 层级3
                if (fi === 0 && ti === 0) {
                  newItem.threeRowSpan = ss.children.reduce((a, b) => {
                    // console.log(a, b)
                    return a + b.children.length
                  }, 0)
                }
                // 二级合并的行,当前子级children的长度, 第三列, 层级2
                if (fi === 0) {
                  newItem.twoRowSpan = tt.children.length
                }

                newData.push(newItem)
              })
            })
          }
        })
      }
    })
    // console.log(newData)
    return newData
  }

  useEffect(() => {
    getTableData()
  }, [])

  // 点击第一级
  const changeFirst = (e: any ,id: string) => {
    console.log(e.target.checked,  id)
    const isCheck = e.target.checked
    let arr = []
    const reducer = (table, isChild) => {
      arr = table.map(item => {
        if(item.id === id || isChild) {
          if (item.children) {
            reducer(item.children, 1)
          }
          item.checked = isCheck
          item.indeterminate = false
        }
        return item
      })
    }
    reducer(oldTable, 0)
    setOldTable(arr)
    setTableData(handleSpan2(arr))
  }

  // 点击第二级
  const changeTwo = (e: any ,row: any) => {
    // console.log(e.target.checked,  row)
    const isCheck = e.target.checked
    let arr = []
    arr = oldTable.map(item => {
      if(item.id === row.firstId) {
        const reducer = (table, isChild) => {
          table.map(ss => {
            if (ss.id === row.secondId || isChild){
              if (ss.children) {
                reducer(ss.children, 1)

              }
              ss.checked = isCheck
              ss.indeterminate = false
            }
          })
        }
        reducer(item.children, 0)
      }
      return item
    })

    arr.map(item => {
      if(item.id === row.firstId) {
        let count = 0
        item.children.map(ss => {
          if (ss.checked) count++
        })
        if (count === item.children.length) {
          item.checked = true
          item.indeterminate = false
        } else if (count > 0 && count < item.children.length) {
          item.checked = false
          item.indeterminate = true
        } else {
          item.checked = false
          item.indeterminate = false
        }
      }
    })
    console.log(arr)
    setOldTable(arr)
    setTableData(handleSpan2(arr))
  }
  
  // 点击第三级
  const changeThree = (e: any ,row: any) => {
    const isCheck = e.target.checked
    let arr = []
    arr = oldTable.map(item => {
      if(item.id === row.firstId) {
        item.children.map(ss => {
          if (ss.id === row.secondId) {
            ss.children.map(tt => {
              if (tt.id === row.threeId) {
                tt.children.map(ff => {
                  ff.checked = isCheck
                })
                tt.checked = isCheck
                tt.indeterminate = false
              }
            })
          }
        })
      }
      return item
    })

    arr.map(item => {
      if(item.id === row.firstId) {
        let count = 0
        let indeterminate = false
        item.children.map(ss => {
          if (ss.id === row.secondId) {
            let tcount = 0
            ss.children.map(tt => {
              if (tt.checked) {
                tcount++
              }
            })
            if (tcount === ss.children.length) {
              ss.checked = true
              ss.indeterminate = false
            } else if (tcount > 0 && tcount < ss.children.length) {
              ss.checked = false
              ss.indeterminate = true
            } else {
              ss.checked = false
              ss.indeterminate = false
            }
          }
          if (ss.indeterminate) {
            indeterminate = true
          }
          if (ss.checked) {
            count++
          }
        })
        if (indeterminate) {
          item.checked = false
          item.indeterminate = true
        } else if (count === item.children.length) {
          item.checked = true
          item.indeterminate = false
        } else if (count > 0 && count < item.children.length) {
          item.checked = false
          item.indeterminate = true
        } else {
          item.checked = false
          item.indeterminate = false
        }
      }
      return item
    })

    console.log(arr)
    setOldTable(arr)
    setTableData(handleSpan2(arr))
  }

  // 点击第四级
  const changeFour = (e: any ,row: any) => {
    const isCheck = e.target.checked
    // console.log(isCheck, row)
    let arr = JSON.parse(JSON.stringify(oldTable))
    const reducer = (data) => {
      data.map(item => {
        if (item.children) {
          reducer(item.children)
        } else if (item.id === row.id) {
          item.checked = isCheck
        }
      })
    }
    reducer(arr)

    arr.map(item => {
      if(item.id === row.firstId) {
        let count = 0
        let indeterminate = false
        item.children.map(ss => {
          if (ss.id === row.secondId) {
            let tcount = 0
            let sindeterminate = false
            ss.children.map(tt => {
              if (tt.id === row.threeId) {
                let fcount = 0
                tt.children.map(ff => {
                  if (ff.checked) {
                    fcount++
                  }
                })
                if (fcount === tt.children.length) {
                  tt.checked = true
                  tt.indeterminate = false
                } else if (fcount > 0 && fcount < tt.children.length) {
                  tt.checked = false
                  tt.indeterminate = true
                } else {
                  tt.checked = false
                  tt.indeterminate = false
                }
              }
              if (tt.indeterminate) {
                sindeterminate = true
              }
              if (tt.checked) {
                tcount++
              }
              console.log(1, tt)
            })
            if (sindeterminate) {
              ss.checked = false
              ss.indeterminate = true
            } else if (tcount === ss.children.length) {
              ss.checked = true
              ss.indeterminate = false
            } else if (tcount > 0 && tcount < ss.children.length) {
              ss.checked = false
              ss.indeterminate = true
            } else {
              ss.checked = false
              ss.indeterminate = false
            }
          }
          if (ss.indeterminate) {
            indeterminate = true
          }
          if (ss.checked) {
            count++
          }
          console.log(2, ss)
        })
        if (indeterminate) {
          item.checked = false
          item.indeterminate = true
        } else if (count === item.children.length) {
          item.checked = true
          item.indeterminate = false
        } else if (count > 0 && count < item.children.length) {
          item.checked = false
          item.indeterminate = true
        } else {
          item.checked = false
          item.indeterminate = false
        }
        console.log(3, item)
      }
      return item
    })

    console.log(arr)
    setOldTable(arr)
    setTableData(handleSpan2(arr))
  }

  const colums = [
    {
      title: '页面名称',
      dataIndex: 'name',
      render: (value, row) => {
        const obj = {
          children: <Checkbox 
          indeterminate={row.firstindeterminate} 
          checked={row.firstchecked}
          onChange={(val) => changeFirst(val,  row.firstId)}
          >{value}</Checkbox>,
          props: {
            rowSpan: 0
          },
        };
        if (row.fourRowSpan) {
          obj.props.rowSpan = row.fourRowSpan;
        }

        return obj;
      },
    },
    {
      title: '一级',
      dataIndex: 'firstType',
      render: (value, row) => {
        const obj = {
          children: <Checkbox 
          indeterminate={row.seconddeterminate} 
          checked={row.secondtchecked}
          onChange={(val) => changeTwo(val,  row)}
          >{value}</Checkbox>,
          props: {
            rowSpan: 0
          },
        };
        if (row.threeRowSpan) {
          obj.props.rowSpan = row.threeRowSpan;
        }

        return obj;
      },
    },
    {
      title: '二级',
      dataIndex: 'secondType',
      render: (value, row) => {
        const obj = {
          children: <Checkbox 
          indeterminate={row.threeindeterminate} 
          checked={row.threechecked}
          onChange={(val) => changeThree(val,  row)}
          >{value}</Checkbox>,
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
      title: '三级',
      dataIndex: 'threeType',
      render: (value, row) => (
        <Checkbox 
          checked={row.checked}
          onChange={(val) => changeFour(val, row)}
        >{value}</Checkbox>
      )
    },
    // {
    //   title: '三级分类',
    //   dataIndex: 'thirdType',
    //   render: (value, row) => (
    //     <Space>{value.children && value.children.map(item => (
    //       <span>{item.name}</span>
    //     ))}</Space>
    //   )
    // }
  ]

  return (
    <div>
      <h2>动态数据表格合并(四级合并)</h2>
      <p>模拟实现tree树形数据</p>
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