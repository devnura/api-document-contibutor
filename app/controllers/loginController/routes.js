const express = require('express')
const router = express.Router()
const login = require('./login')

const {
    login_rules,
    validate
} = require('./validator')

router.post('/', login_rules(), validate, login);
// router.post('/info', loginInfo);

module.exports = router;