import React, { memo } from 'react';
import { CloseOutlined } from '@ant-design/icons';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }: any) => {
  // console.log(1, data)

  return (
    <>
      <Handle
        type="target"
        position="top"
        className="my_handle"
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      <div className="nodeContent" style={data.style}>
        <div className="nodelabel">{data.label}</div>
        <div className="close">
          <CloseOutlined
            onClick={(e) => {
              e.stopPropagation();
              data.onChange(data);
            }}
            className="icon-close"
          />
        </div>
      </div>

      <Handle
        type="source"
        position="bottom"
        id="a"
        className="my_handle"
        isConnectable={isConnectable}
      />
    </>
  );
});
