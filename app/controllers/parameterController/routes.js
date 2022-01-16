const express = require('express')
const router = express.Router()

const {
    findSetting,
    findSettingById,
    createSetting,
    updateSetting,
    deleteSettingById,
    setActive
} = require('./parameterController')

const jwtFerify = require('../../middleware/jwtFerify')

const {
    post_rules,
    get_rules,
    update_rules,
    validate,
    delete_rules,
    change_active_rules
} = require('./validator')

router.get('/', jwtFerify, findSetting)
router.get('/:id', jwtFerify, get_rules(), validate, findSettingById)
router.post('/create', jwtFerify, post_rules(), validate, createSetting)
router.put('/change/active/:id', jwtFerify, change_active_rules(), validate, setActive)
router.put('/:id', jwtFerify, update_rules(), validate, updateSetting)
router.delete('/:id', jwtFerify, delete_rules(), validate, deleteSettingById)

module.exports = router;