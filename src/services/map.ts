import { request } from 'umi';

export async function getMapData() {
  return request('/api/map/data');
}
