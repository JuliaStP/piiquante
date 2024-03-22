const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/sauces', auth, stuffCtrl.getAllStuff);
router.post('/sauces', auth, multer, stuffCtrl.createThing);
router.get('/sauces/:id', stuffCtrl.getOneThing);
router.put('/sauces/:id', multer, stuffCtrl.modifyThing);
router.delete('/sauces/:id', stuffCtrl.deleteThing);
router.post('/sauces/:id/like', stuffCtrl.likeThing);

module.exports = router;