import { request } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-layout';

/** 获取菜单 */
export async function getAuthRoutes() {
  return request<{ data: MenuDataItem[] }>('/api/get-auth-routes', {
    method: 'POST',
  });
}
