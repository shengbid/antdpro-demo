import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { history, useModel } from 'umi';
import { find } from 'lodash';
import type { menuTabProps } from '@/services/types';
import { handleMenusToFlat } from '@/utils/base';

const CommonLayout: React.FC = (props: any) => {
  const { location, route } = props;
  const { pathname } = location;
  const [activeKey, setActiveKey] = useState<string>('');
  const { exitMenus, updateMenus } = useModel('exitMenus', (model) => ({
    exitMenus: model.exitMenus,
    updateMenus: model.updateMenus,
  }));

  const flatMenus = handleMenusToFlat(route.routes);

  useEffect(() => {
    // console.log(333, location, flatMenus);
    const arr: menuTabProps[] = exitMenus.filter((item: menuTabProps) => item.key !== pathname);
    if (arr.length === exitMenus.length) {
      const activeTab = find(flatMenus, (item) => item.pathname === pathname) || {};
      const activeMenu: menuTabProps = {
        tab: activeTab.name,
        key: pathname,
        closable: exitMenus.length > 0, // 新增时,第一个页面不能删除
      };
      arr.push(activeMenu);

      updateMenus(arr);
    } else if (exitMenus.length === 1) {
      // 删除时,只剩一个标签去掉删除图标
      const data = exitMenus;
      data[0].closable = false;
      updateMenus(data);
    }
    setActiveKey(pathname);
  }, [location]);

  const onTabChange = (key: string) => {
    history.push(key);
    setActiveKey(key);
    console.log(key);
  };
  return (
    <PageContainer
      tabList={exitMenus}
      onTabChange={onTabChange}
      header={{
        title: null,
      }}
      tabProps={{
        type: 'editable-card',
        hideAdd: true,
        activeKey,
        tabBarStyle: {
          paddingBottom: '3px',
        },
        onEdit: (path) => {
          // console.log(path, action, pathname);
          let activePath = pathname;
          const arr: menuTabProps[] = exitMenus.filter((item: menuTabProps, i: number) => {
            if (item.key === pathname) {
              // 获取前一个标签
              activePath = exitMenus[i - 1].key;
            }
            return item.key !== path;
          });
          // 如果关闭当前标签,展示前一个标签
          if (path === pathname) {
            history.push(activePath);
          }
          updateMenus(arr);
        },
      }}
    >
      {props.children}
    </PageContainer>
  );
};

export default CommonLayout;
