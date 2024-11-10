// routes/ideaRoutes.js
const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');
const path = require('path');

router.post('/submit/ideas', ideaController.createIdea);
router.delete('/api/ideas/:id', ideaController.deleteIdea);
router.get('/api/ideas', ideaController.getIdeas);
router.get('/ideas', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/ideas.html'));
});

module.exports = router;