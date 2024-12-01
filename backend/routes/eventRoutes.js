const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {createEvent, getEvents, participateInEvent} = require('../controllers/eventController')

router.post('/create', authMiddleware, createEvent);
router.get('/', authMiddleware, getEvents);
router.post('/participate/:id', authMiddleware, participateInEvent);


module.exports = router;
