const express = require('express');
const router = express.Router();
const { 
  getAllOpportunities, 
  getOpportunity, 
  applyForOpportunity, 
  getUserApplications 
} = require('../controllers/opportunityController');
const auth = require('../middleware/auth');

router.get('/', getAllOpportunities);
router.get('/:id', getOpportunity);
router.post('/:id/apply', auth, applyForOpportunity);
router.get('/user/applications', auth, getUserApplications);

module.exports = router;