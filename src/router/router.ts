import express from 'express';
import * as controller from '../controller/controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('🦆🦆🦆🦆🦆Quack Quack Quack🦆🦆🦆🦆🦆');
  console.log('server got request');
});


// everything will be uncommented as soon as fully implemented.


//PROFILE ROUTES
// router.get('/profile/get/:uid', controller.getUserProfile);
// router.post('/profile/create', controller.postUserProfile);
// router.put('/profile/edit/:uid', controller.editUserProfile);

//REQUEST ROUTES
router.post('/request/post', controller.postRequest);
// router.get('request/get/', controller.getAllIncomingRequests);
export default router;
