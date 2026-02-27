const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getUserBadges, 
  getUserProgress, 
  getUserSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule
} = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/dashboard', auth, getDashboardStats);
router.get('/badges', auth, getUserBadges);
router.get('/progress', auth, getUserProgress);
router.get('/schedule', auth, getUserSchedule);
router.post('/schedule', auth, createSchedule);
router.put('/schedule/:id', auth, updateSchedule);
router.delete('/schedule/:id', auth, deleteSchedule);

module.exports = router;