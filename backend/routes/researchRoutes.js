const express = require('express');
const router = express.Router();
const upload = require('../middleware/fileUpload');

const authMiddleware = require('../middleware/authMiddleware');

const {createResearch, getResearches, approveResearch, deleteResearch} = require('../controllers/researchController')

router.post('/create', authMiddleware, upload.single('file'), createResearch); // Upload single PDF

router.get('/', authMiddleware, getResearches);
router.put('/approve/:id', authMiddleware, approveResearch);
router.delete('/:id', authMiddleware, deleteResearch); // Admin can delete research

module.exports = router;
