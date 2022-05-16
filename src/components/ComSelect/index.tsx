import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export interface iconSelectProps {
  placeholder?: string;
  key: string;
}

const DictSelect: React.FC<iconSelectProps> = ({ placeholder = '请选择' }) => {
  const dictList: { dictValue: string; dictLabel: string }[] = [
    {
      dictLabel: '男',
      dictValue: '0',
    },
    {
      dictLabel: '女',
      dictValue: '1',
    },
  ];
  return (
    <Select placeholder={placeholder} showSearch allowClear style={{ width: '100%' }}>
      {dictList.map((item) => {
        return (
          <Option value={item.dictValue} key={item.dictValue}>
            {item.dictLabel}
          </Option>
        );
      })}
    </Select>
  );
};

export default DictSelect;
