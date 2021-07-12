import Cors from 'cors'
import nextConnect from 'next-connect';
import dbMiddleware from '../../middlewares/db';

const handler = nextConnect();

handler.use(dbMiddleware);
handler.use(Cors({methods: ['GET', 'POST', 'OPTIONS']}));

handler.get(async (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: 'OK'
  });
});

export default handler;