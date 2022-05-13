import { Request, Response } from 'express';
import Mock from 'mockjs';
const Random = Mock.Random;

const uploadData = (req: Request, res: Response) => {
  const color = Random.color();
  const text = Random.word(4, 10);

  res.send({
    data: {
      fileUrl: Random.image('400x300', color, '#FFF', text),
      // fileUrl: '8888'
    },
    success: true,
  });
};

export default {
  'POST /api/upload/file': uploadData,
};
