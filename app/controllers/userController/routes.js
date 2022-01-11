const express = require('express')
const router = express.Router()

const {
    findUser,
    findUserById,
    createUser,
    updateUser,
    deleteUserById
} = require('./userController')

const jwtFerify = require('../../middleware/jwtFerify')

const {
    post_rules,
    get_rules,
    update_rules,
    validate,
    delete_rules
} = require('./validator')

router.get('/', jwtFerify, findUser)
router.get('/:id', jwtFerify, get_rules(), validate, findUserById)
router.post('/', jwtFerify, post_rules(), validate, createUser)
router.put('/:id', jwtFerify, update_rules(), validate, updateUser)
router.delete('/:id', jwtFerify, delete_rules(), validate, deleteUserById)

// router.get('/',  function (req, res) {
//     return res.status(200).json({
//         status: '00',
//         message: "GET Method",
//         data: {
//             param: req.params,
//             body: req.body
//         }
//     });
// })

// router.get('/:id', get_rules(), validate, function (req, res) {
//     return res.status(200).json({
//         status: '00',
//         message: "GET Method",
//         data: {
//             param: req.params,
//             body: req.body
//         }
//     });
// })



// router.put('/:id', update_rules(), validate, function (req, res) {
//     return res.status(200).json({
//         status: '00',
//         message: "PUT Method",
//         data: {
//             param: req.params,
//             body: req.body
//         }
//     })
// })

// router.delete('/:id', delete_rules(), validate, function (req, res) {
//     return res.status(200).json({
//         status: '00',
//         message: "DELETE Method",
//         data: {
//             param: req.params,
//             body: req.body
//         }
//     })
// })

// router.post('/info', loginInfo);

module.exports = router;