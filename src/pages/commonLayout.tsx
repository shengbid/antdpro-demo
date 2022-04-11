import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
// import { Card } from 'antd';

const CommonLayout: React.FC = (pros: any) => {
  return <PageContainer>{pros.children}</PageContainer>;
};

export default CommonLayout;
