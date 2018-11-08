const checkAuth = require('../middleware/check-auth')

const express = require('express')

const userRoutes = require('./users')

const authRoutes = require('./auth')

const candidateRoutes = require('./candidates')

const router = express.Router() // make a new router

router.use('/auth', authRoutes)

router.use('/users', checkAuth, userRoutes)

router.use('/candidates', candidateRoutes)

module.exports = router
