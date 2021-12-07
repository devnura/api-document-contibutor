const express = require('express')
const router = express.Router()
const login = require('./login')

const {
    post_rules,
    get_rules,
    update_rules,
    validate,
    delete_rules
} = require('./validator')

// router.get('/', validate, login)

router.get('/', function (req, res) {
    return res.status(200).json({
        status: '00',
        message: "GET Method",
        data: {
            param: req.params,
            body: req.body
        }
    });
})

router.get('/:id', get_rules(), validate, function (req, res) {
    return res.status(200).json({
        status: '00',
        message: "GET Method",
        data: {
            param: req.params,
            body: req.body
        }
    });
})

router.post('/', post_rules(), validate, function (req, res) {
    return res.status(200).json({
        status: '00',
        message: "POST Method",
        data: {
            param: req.params,
            body: req.body
        }
    })
})

router.put('/:id', update_rules(), validate, function (req, res) {
    return res.status(200).json({
        status: '00',
        message: "PUT Method",
        data: {
            param: req.params,
            body: req.body
        }
    })
})

router.delete('/:id', delete_rules(), validate, function (req, res) {
    return res.status(200).json({
        status: '00',
        message: "DELETE Method",
        data: {
            param: req.params,
            body: req.body
        }
    })
})

// router.post('/info', loginInfo);

module.exports = router;