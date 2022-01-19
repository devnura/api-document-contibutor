const express = require('express')
const router = express.Router()

const {
    connectionDb,
    connectionWa
} = require('./connection')

router.get('/check/db', connectionDb);
router.post('/check/wa', connectionWa);

module.exports = router;