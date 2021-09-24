import { request } from 'umi';
import type { articleProps } from 'mock/editor'

/** 获取文章列表 */
export async function getArticleList() {
  return request('/api/article/list', {
    method: 'POST',
  });
}
/** 新增文章列表 */
export async function addArticle(data: articleProps) {
  return request('/api/article/add', {
    method: 'POST',
    data
  });
}