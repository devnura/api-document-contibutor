const express = require('express')
const router = express.Router()

const {
    findRole,
    findRoleById,
    createRole,
    updateRole,
    deleteRoleById
} = require('./roleController')

const jwtFerify = require('../../middleware/jwtFerify')

const {
    post_rules,
    get_rules,
    update_rules,
    validate,
    delete_rules
} = require('./validator')

router.post('/', jwtFerify, findRole)
router.get('/:id', jwtFerify, get_rules(), validate, findRoleById)
router.post('/create', jwtFerify, post_rules(), validate, createRole)
router.put('/:id', jwtFerify, update_rules(), validate, updateRole)
router.delete('/:id', jwtFerify, delete_rules(), validate, deleteRoleById)

module.exports = router;