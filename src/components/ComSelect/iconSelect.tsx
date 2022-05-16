import React from 'react';
import { Select } from 'antd';
import Icon from '@ant-design/icons';
import * as icons from '@ant-design/icons';

const { Option } = Select;

export interface iconSelectProps {
  placeholder?: string;
}

const IconSelect: React.FC<iconSelectProps> = ({ placeholder = '请选择图标' }) => {
  const iconList = Object.keys(icons);
  return (
    <Select placeholder={placeholder} showSearch allowClear style={{ width: '100%' }}>
      {iconList.map((item) => {
        return (
          <Option value={item} key={item}>
            <Icon component={icons[item]} style={{ marginRight: '8px' }} />
            {item}
          </Option>
        );
      })}
    </Select>
  );
};

export default IconSelect;
