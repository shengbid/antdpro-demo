import { useState, useCallback } from 'react';
import type { menuTabProps } from '@/services/types';

export default () => {
  const [exitMenus, setExitMenus] = useState<menuTabProps[]>([]);

  // 改变缓存菜单
  const updateMenus = useCallback((menus: menuTabProps[]) => {
    setExitMenus(menus);
  }, []);

  return {
    exitMenus,
    updateMenus,
  };
};
