import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history, useModel } from 'umi';
import { find } from 'lodash';

export type menuItemProps = {
  tab: string;
  key: string;
  pathname: string;
};

const CommonLayout: React.FC = (props: any) => {
  const { location } = props;
  const { exitMenus, updateMenus } = useModel('exitMenus', (model) => ({
    exitMenus: model.exitMenus,
    updateMenus: model.updateMenus,
  }));

  useEffect(() => {
    console.log(333, exitMenus);
    const arr: menuItemProps[] = exitMenus.filter(
      (item: menuItemProps) => item.pathname !== location.pathname,
    );
    if (arr.length === exitMenus.length) {
      arr.push({
        tab: location.key,
        key: location.key,
        pathname: location.pathname,
      });
      updateMenus(arr);
    }
  }, [location]);

  const onTabChange = (key) => {
    const activeTab = find(exitMenus, (item) => item.key === key) || {};
    console.log(key, activeTab);
    history.push(activeTab.pathname);
  };
  return (
    <PageContainer
      tabList={exitMenus}
      onTabChange={onTabChange}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        onEdit: (e, action) => {
          console.log(e, action);
          const arr: menuItemProps[] = exitMenus.filter(
            (item: menuItemProps) => item.pathname !== location.pathname,
          );
          updateMenus(arr);
        },
      }}
    >
      {props.children}
    </PageContainer>
  );
};

export default CommonLayout;
