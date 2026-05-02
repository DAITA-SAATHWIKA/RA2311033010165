const express = require('express');
const { getSchedule } = require('../controllers/scheduleController');
const { Log } = require('../../logging_middleware/logger');

const router = express.Router();

router.get('/schedule', async (req, res, next) => {
    await Log("backend", "info", "controller", "Incoming request to /schedule");
    next();
}, getSchedule);

module.exports = router;
