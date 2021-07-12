import Cors from 'cors'
import nextConnect from 'next-connect';
import dbMiddleware from '../../middlewares/db';
import moment from 'moment-timezone';

const handler = nextConnect();

handler.use(dbMiddleware);
handler.use(Cors({methods: ['GET', 'POST', 'OPTIONS']}));

handler.post(async (req, res) => {
  const body = req.body;
  const checkExist = await req.db.collection('oksigen')
    .where('store_name', '==', body.store_name)
    .where('province_id', '==', body.province_id)
    .where('city_id', '==', body.city_id)
    .get()
    .then((snap) => !snap.empty);

  if (checkExist) {
    return res.status(400).json({
      statusCode: 400,
      error: 'Data exist'
    });
  }

  const insert = {
    store_name: body.store_name,
    province_id: body.province_id,
    city_id: body.city_id,
    address: body.address,
    contact_phone: body.contact_phone,
    contact_wa: body.contact_wa,
    website: body.website,
    submit_by: body.submit_by || 'system',
    is_active: body.is_active || false,
    is_approved: body.is_approved || false,
    categories: body.categories,
    created_at: moment().format('YYYY-MM-DD HH:mm:ss')
  };
  await req.db.collection('oksigen').add(insert);
  return res.status(200).json({
    statusCode: 200,
    data: insert
  });
});

export default handler;