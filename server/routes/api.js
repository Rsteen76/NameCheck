const checkAuth = require('../middleware/check-auth')
/*
 * This file is used to build the API routes, we may have
 * different routes for views and the like
 */
const express = require('express')

const userRoutes = require('./users')

const authRoutes = require('./auth')

const candidateRoutes = require('./candidates')

const router = express.Router() // make a new router

router.use('/auth', authRoutes)

router.use('/users', checkAuth, userRoutes)

router.use('/candidates', candidateRoutes)

module.exports = router
