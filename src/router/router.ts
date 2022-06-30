import express from 'express';
import controllers from '../controller/index.controllers';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('🦆🦆🦆🦆🦆Quack Quack Quack🦆🦆🦆🦆🦆');
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
router.get('/helpRequests', controllers.helpRequest.getAllHelpRequests);
router.get('/helpRequest/:id', controllers.helpRequest.getHelpRequestById);
router.get('/findHelpRequest?', controllers.helpRequest.findHelpRequests);

router.post('/helpRequest', controllers.helpRequest.createHelpRequest);
//TODO
router.delete(
  '/helpRequest?:helpRequestId',
  controllers.helpRequest.deleteHelpRequest
);

//TODO maybe make a more readable route for this. Something like:
// router.get('/helpRequests/:uid', controllers.helpRequest.getUserHelpRequestsByUid);

//HelpOffer ROUTES
router.get('/helpOffers', controllers.helpOffer.getAllHelpOffers);
router.get('/helpOffer/:id', controllers.helpOffer.getHelpOfferById);
router.post(
  '/helpRequest/:helpRequestId/helpOffer',
  controllers.helpOffer.createHelpOffer
);

router.post(
  '/helpRequest/:helpRequestId/helpOffer/:helpOfferId/accept',
  controllers.helpOffer.acceptHelpOffer
);
router.post(
  '/helpRequest/:helpRequestId/helpOffer/:helpOfferId/decline',
  controllers.helpOffer.declineHelpOffer
);

//route to catch all other routes
router.get('*', (req, res) => res.status(404).send('404 Not Found'));
router.post('*', (req, res) => res.status(404).send('404 Not Found'));
router.put('*', (req, res) => res.status(404).send('404 Not Found'));
router.delete('*', (req, res) => res.status(404).send('404 Not Found'));

export default router;
