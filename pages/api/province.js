import Cors from 'cors'
import nextConnect from 'next-connect';
import rp from 'request-promise';

const handler = nextConnect();

handler.use(Cors({methods: ['GET']}));

handler.get(async (_, res) => {
  return rp({
    uri: 'http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json',
    method: 'GET',
    json: true
  })
  .then((result) => res.status(200).json(result))
  .catch((err) => {
    console.error(err.stack);
    return res.status(200).json([]);
  });
});

export default handler;