const express = require('express')
const router = express.Router()

const {
    findDocument,
    findDocumentById,
    findDocumentByUser,
    createDocument,
    updateDocument,
    deleteDocumentById,
    getDocumentTemplate,
    approveDocument
} = require('./documentController')

const jwtFerify = require('../../middleware/jwtFerify')

const {
    post_rules,
    get_rules,
    update_rules,
    validate,
    delete_rules,
    template_rules,
    approv_rules,
    get_by_user_rules
} = require('./validator')

router.get('/', jwtFerify, findDocument)
router.get('/id/:id', jwtFerify, get_rules(), validate, findDocumentById)
router.post('/user', jwtFerify, get_by_user_rules(), validate, findDocumentByUser)
router.post('/create', jwtFerify, post_rules(), validate, createDocument)
router.put('/update/:id', jwtFerify, update_rules(), validate, updateDocument)
router.post('/approve', jwtFerify, approv_rules(), validate, approveDocument)
router.delete('/:id', jwtFerify, delete_rules(), validate, deleteDocumentById)
router.get('/template/:filename', jwtFerify, template_rules(), validate, getDocumentTemplate)

module.exports = router;