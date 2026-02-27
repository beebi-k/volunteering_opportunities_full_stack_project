const express = require('express');
const router = express.Router();
const { getAllOrganizations, getOrganization, getCategories } = require('../controllers/organizationController');

router.get('/', getAllOrganizations);
router.get('/categories', getCategories);
router.get('/:id', getOrganization);

module.exports = router;