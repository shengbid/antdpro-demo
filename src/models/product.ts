import { useState, useCallback } from 'react'

export default () => {
  const [count, setCount] = useState(0)

  // 增加数量
  const addCount = useCallback(() => {
    setCount(count + 1)
  }, [])

  // 减少数量
  const substractCount = useCallback(() => {
    setCount(count - 1)
  }, [])

  return {
    count,
    addCount,
    substractCount
  }
}