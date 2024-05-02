const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/activities', adminController.verifyToken, adminController.getActivities);
router.post('/manage-users', adminController.verifyToken, adminController.manageUsers);

module.exports = router;
