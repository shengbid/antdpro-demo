import React, { useState, useEffect } from 'react';
import { Input, Switch } from 'antd';

export type nodeProps = {
  info: any;
  onChange: (val: any) => void;
};

export default ({ info, onChange }: nodeProps) => {
  const [nodeInfo, setNodeInfo] = useState<any>({});

  useEffect(() => {
    if (info.id) {
      // console.log(info)
      if (!info.isHidden) {
        info.isHidden = false;
      }
      setNodeInfo(info);
    }
  }, [info.id]);

  // 改变名称
  const setNodeName = (value: string) => {
    setNodeInfo({
      ...nodeInfo,
      label: value,
    });
    onChange({
      ...nodeInfo,
      label: value,
    });
  };

  // 改变背景色
  const setNodeBg = (value: string) => {
    console.log(value);
    setNodeInfo({
      ...nodeInfo,
      nodeBg: value,
    });
    onChange({
      ...nodeInfo,
      nodeBg: value,
    });
  };

  // 是否隐藏
  const setNodeHidden = (value: boolean) => {
    setNodeInfo({
      ...nodeInfo,
      isHidden: value,
    });
    onChange({
      ...nodeInfo,
      isHidden: value,
    });
  };

  return nodeInfo.id ? (
    <div className="updatenode__controls">
      <label>名称:</label>
      {/* <input value={nodeInfo.label} onChange={(evt) => setNodeName(evt.target.value)} /> */}
      <Input
        placeholder=""
        value={nodeInfo.label}
        onChange={(evt) => setNodeName(evt.target.value)}
      />

      <label className="updatenode__bglabel">背景色:</label>
      <Input type="color" value={nodeInfo.nodeBg} onChange={(evt) => setNodeBg(evt.target.value)} />

      <div className="updatenode__checkboxwrapper">
        <label>是否隐藏:</label>
        <Switch checked={nodeInfo.isHidden} onChange={setNodeHidden} />
      </div>
    </div>
  ) : (
    <></>
  );
};
