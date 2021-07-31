import { useModel } from 'umi';
import { Descriptions, Button } from 'antd';

export default () => {
  const { count, addCount, substractCount } = useModel('product', model => (
    { 
      count: model.count, 
      addCount: model.addCount,
      substractCount: model.substractCount,
    }
  ))

  return <>
    <h2>页面二</h2>
    <Descriptions title="商品信息">
      <Descriptions.Item label="名称">T-shirt</Descriptions.Item>
      <Descriptions.Item label="价格">799</Descriptions.Item>
      <Descriptions.Item label="数量">{count}</Descriptions.Item>
    </Descriptions>
    <h2>修改数据</h2>
    <Button type="primary" onClick={() => {addCount(2)}} style={{marginRight: '10px'}}>
      数量+2
    </Button>
    <Button type="primary" onClick={() => {substractCount(2)}}>
      数量-2
    </Button>
  </>
};