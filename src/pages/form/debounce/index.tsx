import React from 'react'
import DebounceSelect from '@/components/debounce';
import { Card } from 'antd'

const Demo: React.FC = () => {

  return (
    <div>
      <p>延迟搜索select</p>
      <Card style={{ width: 300 }}>
      <DebounceSelect
      />
      </Card>
    </div>
  );
};

export default Demo