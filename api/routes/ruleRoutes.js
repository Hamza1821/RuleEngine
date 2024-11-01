const express = require('express');
const router = express.Router();
const ruleController = require('../controllers/ruleController');

// Route definitions
router.post('/create_rule', ruleController.createRule);
router.post('/combine_rules', ruleController.combineRules);
router.post('/evaluate_rule', ruleController.evaluateRule);

module.exports = router;
