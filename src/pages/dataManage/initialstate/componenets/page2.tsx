import { useModel } from 'umi';
import { Descriptions } from 'antd'

export default () => {
  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
  
  const { currentUser } = initialState

  return <>
    <h2>页面二</h2>
    <div>数据:</div>
    <Descriptions title="登陆信息">
      <Descriptions.Item label="UserName">{currentUser.name}</Descriptions.Item>
      <Descriptions.Item label="Telephone">{currentUser.phone}</Descriptions.Item>
      <Descriptions.Item label="group">{currentUser.group}</Descriptions.Item>
      <Descriptions.Item label="signature">{currentUser.signature}</Descriptions.Item>
      <Descriptions.Item label="Address">
      {currentUser.address}
      </Descriptions.Item>
    </Descriptions>
  </>
};