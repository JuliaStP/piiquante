const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/stuff');

router.get('/sauces', auth, stuffCtrl.getAllStuff);
router.post('/sauces', auth, stuffCtrl.createThing);
router.get('sauces/:id', auth, stuffCtrl.getOneThing);
router.put('/sauces/:id ', auth, stuffCtrl.modifyThing);
router.delete('/sauces/:id ', auth, stuffCtrl.deleteThing);
// router.post('/sauces/:id/like', auth, stuffCtrl.likeThing);

module.exports = router;