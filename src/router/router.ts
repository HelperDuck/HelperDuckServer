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
router.post('/user/:uid/technologies', controllers.technology.updateUserTechnologies);
//TODO add languages
// router.post('/user/:uid/languages', controllers.user.updateLanguages);

//Languages
router.get('/technologies', controllers.technology.getAllProgramLang);
router.get('/languages', controllers.languages.getAllLanguages);

//HelpRequest ROUTES
router.get('/helpRequests', controllers.helpRequest.getAllHelpRequests);
router.get('/helpRequest/:id', controllers.helpRequest.getHelpRequestById);
router.get('/findHelpRequests?', controllers.helpRequest.findHelpRequests);

router.post('/helpRequest', controllers.helpRequest.createHelpRequest);
router.delete('/helpRequest?', controllers.helpRequest.deleteHelpRequest);
router.post('/helpRequest/:helpRequestId/:helpOfferId/solved', controllers.helpRequest.solvedHelpRequest);

//HelpOffer ROUTES
router.get('/helpOffers', controllers.helpOffer.getAllHelpOffers);
router.get('/findHelpOffers?', controllers.helpOffer.findHelpOffers);
router.get('/helpOffer/:id', controllers.helpOffer.getHelpOfferById);
router.post('/helpRequest/:helpRequestId/helpOffer', controllers.helpOffer.createHelpOfferOpen);
router.post('/helpRequest/:helpRequestId/helpOfferDecline', controllers.helpOffer.createHelpOfferDecline);

router.post('/helpRequest/:helpRequestId/helpOffer/:helpOfferId/accept', controllers.helpOffer.acceptHelpOffer);
router.post('/helpRequest/:helpRequestId/helpOffer/:helpOfferId/decline', controllers.helpOffer.declineHelpOffer);

//Review Routes
router.get('/helpReviews', controllers.helpReview.getallHelpReviews);
// router.get('/review/:id', controllers.review.getReviewById);
router.post('/helpReview', controllers.helpReview.createHelpReview);

//route to catch all other routes
router.get('*', (req, res) => res.status(404).send('404 Not Found'));
router.post('*', (req, res) => res.status(404).send('404 Not Found'));
router.put('*', (req, res) => res.status(404).send('404 Not Found'));
router.delete('*', (req, res) => res.status(404).send('404 Not Found'));

export default router;
