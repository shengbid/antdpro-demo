import React, { useState, useEffect } from 'react';
import { Input, Select } from 'antd';

const { Option } = Select;

export type edgeProps = {
  info: any;
  onChange: (val: any) => void;
};

export default ({ info, onChange }: edgeProps) => {
  const [edgeInfo, setEdgeInfo] = useState<any>({});
  const edgeTypes = [
    { label: '曲线', value: 'default' },
    { label: '直线', value: 'straight' },
    { label: '直角线', value: 'step' },
    { label: '圆滑直角线', value: 'smoothstep' },
    // {label: '简单的贝塞尔曲线', value: 'simplebezier'},
  ];

  useEffect(() => {
    if (info.id) {
      // console.log(info)
      if (info.style) {
        info.color = info.style.stroke;
      }
      setEdgeInfo(info);
    }
  }, [info.id]);

  // 改变名称
  const setNodeName = (value: string) => {
    setEdgeInfo({
      ...edgeInfo,
      label: value,
    });
    onChange({
      ...edgeInfo,
      label: value,
    });
  };

  // 改变颜色
  const setNodeBg = (value: string) => {
    // console.log(value);
    setEdgeInfo({
      ...edgeInfo,
      color: value,
    });
    onChange({
      ...edgeInfo,
      color: value,
    });
  };

  // 改变类型
  const changeEdgeType = (value: string) => {
    setEdgeInfo({
      ...edgeInfo,
      type: value,
    });
    onChange({
      ...edgeInfo,
      type: value,
    });
  };

  return edgeInfo.id ? (
    <div className="updatenode__controls">
      <label>审批节点:</label>
      {/* <input value={nodeInfo.label} onChange={(evt) => setNodeName(evt.target.value)} /> */}
      <Input
        placeholder=""
        value={edgeInfo.label}
        onChange={(evt) => setNodeName(evt.target.value)}
      />

      <label className="updatenode__bglabel">连接线颜色:</label>
      <Input type="color" value={edgeInfo.color} onChange={(evt) => setNodeBg(evt.target.value)} />

      <div className="updatenode__checkboxwrapper">
        <label>连接线类型:</label>
        <Select defaultValue="default" value={edgeInfo.type} onChange={changeEdgeType}>
          {edgeTypes.map((item) => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  ) : (
    <></>
  );
};
