/* eslint-disable eqeqeq */
const express = require('express')
const router = express.Router()
const candidatesController = require('../controllers/candidates')
const checkAuth = require('../middleware/check-auth')

/* GET Candidate data needed for admin view */
router.get('/', checkAuth, candidatesController.getCandidates)

// Check availability of a name
router.post('/namecheck', candidatesController.nameCheck)

// Delete unwanted name
router.delete('/:id', checkAuth, candidatesController.delete)

module.exports = router
