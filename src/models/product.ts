import { useState, useCallback } from 'react'

export default () => {
  const [count, setCount] = useState(0)

  // 增加数量
  const addCount = useCallback((val: number = 1) => {
    setCount((pre) => { return pre + val })
  }, [])

  // 减少数量
  const substractCount = useCallback((val: number = 1) => {
    setCount((pre) => { return pre - val })
  }, [])

  return {
    count,
    addCount,
    substractCount
  }
}