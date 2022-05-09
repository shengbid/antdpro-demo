import { useState, useCallback } from 'react';

export type menuItemProps = {
  tab: string;
  key: string;
  pathname: string;
};

export default () => {
  const [exitMenus, setExitMenus] = useState<menuItemProps[]>([]);

  // 改变缓存菜单
  const updateMenus = useCallback((menus: menuItemProps[]) => {
    setExitMenus(menus);
  }, []);

  return {
    exitMenus,
    updateMenus,
  };
};
