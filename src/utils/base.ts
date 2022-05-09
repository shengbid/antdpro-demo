import type { menuItemProps } from '@/services/types';

/**
 * 处理菜单为一级数组
 * menus: 菜单数组
 */
export const handleMenusToFlat = (menus: menuItemProps) => {
  const flatMenus: any[] = [];
  const handle = (arr: any) => {
    arr.forEach((item: menuItemProps) => {
      if (item.children && item.children.length) {
        handle(item.children);
      } else {
        flatMenus.push({
          pathname: item.path,
          name: item.name,
        });
      }
    });
  };
  handle(menus);
  return flatMenus;
};
