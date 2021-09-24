import { Request, Response } from 'express';
import Mock from 'mockjs'
import moment from 'moment';
const Random = Mock.Random

export interface articleProps {
  id?: number
  createTime?: string
  title: string
  content: string
}
const articleList: articleProps[] = []

// 文章列表
const getArticleList = (req: Request, res: Response) => {
  res.send({
    data: articleList,
    success: true
  })
}
// 新增文章
const addArticle = (req: Request, res: Response) => {
  const { title, content } = req.body
  articleList.push({
    id: Random.id(),
    createTime: moment().format('YYYY-MM-DD'),
    title,
    content
  })

  res.send({
    data: {},
    success: true
  })
}

export default {
  'POST /api/article/list': getArticleList,
  'POST /api/article/add': addArticle,
};
