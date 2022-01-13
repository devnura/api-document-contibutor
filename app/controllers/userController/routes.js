const express = require('express')
const router = express.Router()

const {
    findUser,
    findUserById,
    createUser,
    updateUser,
    deleteUserById,
    setActive,
    setPassword
} = require('./userController')

const jwtFerify = require('../../middleware/jwtFerify')

const {
    post_rules,
    get_rules,
    update_rules,
    validate,
    delete_rules,
    change_password_rules,
    change_active_rules
} = require('./validator')

router.get('/', jwtFerify, findUser)
router.get('/:id', jwtFerify, get_rules(), validate, findUserById)
router.post('/create', jwtFerify, post_rules(), validate, createUser)
router.put('/change/password/:id', jwtFerify, change_password_rules(), validate, setPassword)
router.put('/change/active/:id', jwtFerify, change_active_rules(), validate, setActive)
router.put('/:id', jwtFerify, update_rules(), validate, updateUser)
router.delete('/:id', jwtFerify, delete_rules(), validate, deleteUserById)

module.exports = router;