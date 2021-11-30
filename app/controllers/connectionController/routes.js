const express = require('express');
const router = express.Router();
const connection = require('./connection')
const jwtFerify = require('../../middleware/jwtFerify')

router.get('/check', connection);

module.exports = router;