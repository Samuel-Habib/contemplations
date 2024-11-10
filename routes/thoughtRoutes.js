// routes/thoughtRoutes.js
const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');
const path = require('path');


router.post('/submit/thought', thoughtController.createThought);
router.get('/api/mythoughts', thoughtController.getThoughts);
router.get('/mythoughts', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/mythoughts.html'));
});
router.delete('/api/thoughts/:id', thoughtController.deleteThought)


module.exports = router;