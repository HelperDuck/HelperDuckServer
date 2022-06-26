import express from 'express';
import controllers from '../controller/index';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('🦆🦆🦆🦆🦆Quack Quack Quack🦆🦆🦆🦆🦆');
  console.log('server got request');
});

// everything will be uncommented as soon as fully implemented.

//USER ROUTES
router.get('/profile/get/:uid', controllers.user.getUserProfile);
// router.post('/profile/create', controllers.postUserProfile);
// router.put('/profile/edit/:uid', controller.editUserProfile);
router.get('/user/:uid', controllers.user.getUser);

//PROGRAMLANG ROUTES
router.get('/programLang', controllers.programLang.getAllprogramLang);

//REQUEST ROUTES
// router.post('/request/post', controllers.postRequest);
// router.get('/request/get/', controllers.getAllIncomingRequests);
export default router;
