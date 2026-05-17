const express = require('express');
const router = express.Router();
const debateController = require('../controllers/debateController');

// Trigger the multi-agent debate
router.post('/debate', debateController.startDebate);

module.exports = router;
