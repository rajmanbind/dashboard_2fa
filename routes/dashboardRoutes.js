const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController.js');

router.get('/activities', dashboardController.verifyToken, dashboardController.getActivities);
router.post('/revoke-device', dashboardController.verifyToken, dashboardController.revokeDeviceAccess);

module.exports = router;
