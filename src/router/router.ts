import express from 'express';
import controllers from '../controller/index';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('🦆🦆🦆🦆🦆Quack Quack Quack🦆🦆🦆🦆🦆');
  console.log('server got request');
});

// everything will be uncommented as soon as fully implemented.

//USER ROUTES
router.get('/users', controllers.user.getAllUsers);
router.get('/user/:uid', controllers.user.getUser);
router.post('/user', controllers.user.createNewUser);
router.delete('/user/:uid', controllers.user.deleteUser);
router.put('/user/:uid', controllers.user.updateUser);

//Update technologies and languages
router.post(
  '/user/:uid/technologies',
  controllers.technology.updateUserTechnologies
);
//TODO add languages
// router.post('/user/:uid/languages', controllers.user.updateLanguages);

//Languages
router.get('/technologies', controllers.technology.getAllProgramLang);
router.get('/languages', controllers.languages.getAllLanguages);

//HelpRequest ROUTES
router.get('/helpRequests', controllers.request.getAllRequests);
router.get('/helpRequest/:id', controllers.request.getRequestById);
router.post('/helpRequest', controllers.request.createRequest);

// router.post('/request/post', controllers.postRequest);
// router.get('/request/get/', controllers.getAllIncomingRequests);
export default router;
