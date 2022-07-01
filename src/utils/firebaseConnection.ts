import admin from 'firebase-admin';
// import { ServiceAccount } from 'firebase-admin';

const serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
