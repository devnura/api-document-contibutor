const express = require('express')
const router = express.Router()

const {
    findDocument,
    findDocumentById,
    createDocument,
    updateDocument,
    deleteDocumentById
} = require('./documentController')

const jwtFerify = require('../../middleware/jwtFerify')

const {
    post_rules,
    get_rules,
    update_rules,
    validate,
    delete_rules
} = require('./validator')

router.get('/', jwtFerify, findDocument)
router.get('/:id', jwtFerify, get_rules(), validate, findDocumentById)
router.post('/create', jwtFerify, post_rules(), validate, createDocument)
router.put('/:id', jwtFerify, update_rules(), validate, updateDocument)
router.delete('/:id', jwtFerify, delete_rules(), validate, deleteDocumentById)

module.exports = router;