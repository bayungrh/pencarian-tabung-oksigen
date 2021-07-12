import Cors from 'cors'
import nextConnect from 'next-connect';
import dbMiddleware from '../../middlewares/db';

const handler = nextConnect();

handler.use(dbMiddleware);
handler.use(Cors({methods: ['GET', 'POST', 'OPTIONS']}));

handler.get((req, res) => {
  const { provinsi, kota, category } = req.query;
  let collection = req.db.collection('oksigen');
  let filterCategory;

  if (provinsi && parseInt(provinsi) > 0) {
    collection = collection.where('province_id', '==', parseInt(provinsi));
  } 

  if (kota && parseInt(kota) > 0) {
    collection = collection.where('city_id', '==', parseInt(kota));
  }

  switch (category) {
    case 'isi-ulang':
      filterCategory = 'Isi ulang'
      break;
    case 'penyewaan':
      filterCategory = 'Penyewaan'
      break;
    case 'pembelian':
      filterCategory = 'Pembelian'
      break;
  }

  return collection
    .where('is_active', '==', true)
    .where('is_approved', '==', true)
    .get()
    .then((snapshot) => {
      const results = [];
      snapshot.forEach((snap) => {
        const data = snap.data();
        if (filterCategory) {
          if (!data.categories.includes(filterCategory)) return;
        }
        results.push({
          ...data,
          id: snap.id
        })
      });
      return results;
    }).then((result) => {
      res.json({
        statusCode: 200,
        message: 'OK',
        data: result
      });
    }).catch((err) => 
      res.status(500).json({
        statusCode: 500,
        message: err.message
      })
    );
});

export default handler;