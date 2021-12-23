const express = require('express')
const router = express.Router()
const logout = require('./logout')
const logoutValidator = require('./validator')
const jwtFerify = require('../../middleware/jwtFerify')

router.post('/', jwtFerify, logoutValidator, logout);

module.exports = router;