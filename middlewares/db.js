import nextConnect from 'next-connect';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIRABSE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

let fire;
if (!firebase.apps.length) {
  fire = firebase.initializeApp(firebaseConfig);
}else {
  fire = firebase.app(); // if already initialized, use that one
}

async function database(req, res, next) {
  req.db = fire.firestore();
  return next();
}

const middleware = nextConnect();
middleware.use(database);

export default middleware;