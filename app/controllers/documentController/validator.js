const {
    check,
    validationResult
} = require('express-validator')

const post_rules = () => {
    return [
        check('e_tittle').notEmpty().withMessage('e_tittle is required!')
            .isLength({max: 64}).withMessage('e_tittle is out of length!'),
        check('c_desc').notEmpty().withMessage('c_desc is required!')
            .isLength({max: 64}).withMessage('c_desc is out of length!'),
        check('e_encode_document').notEmpty().withMessage('e_encode_document is required!'),
        check('detail').isArray().notEmpty().withMessage('detail is require'),
        check('detail.*.i_id').notEmpty().withMessage('i_id is require!'),
    ]
}

const approv_rules = () => {
    return [
        check('id').notEmpty().withMessage('id is required!')
            .isNumeric().withMessage('id is not numeric!')
            .isLength({max: 16}).withMessage('id is out of length!'),
        check('c_document_code').notEmpty().withMessage('c_document_code is required!')
            .isLength({max: 16}).withMessage('c_document_code is out of length!'),
        check('c_note').exists().withMessage('c_note is required!')
            .isLength({max: 64}).withMessage('c_note is out of length!'),
    ]
}

const update_rules = () => {
    return [
        check('id').notEmpty().withMessage('id is required!')
            .isNumeric().withMessage('id is not numeric!')
            .isLength({max: 8}).withMessage('id is out of length!'),
        check('e_tittle').notEmpty().withMessage('e_tittle is required!')
            .isLength({max: 64}).withMessage('e_tittle is out of length!'),
        check('c_desc').notEmpty().withMessage('c_desc is required!')
            .isLength({max: 64}).withMessage('c_desc is out of length!'),
        check('detail').isArray().notEmpty().withMessage('detail is require'),
        check('detail.*.i_id').notEmpty().withMessage('i_id is require!'),
    ]
}

const delete_rules = () => {
    return [
        check('id').notEmpty().withMessage('id is required!')
            .isNumeric().withMessage('id is not numeric!')
            .isLength({max: 8}).withMessage('id is out of length!'),
    ]
}
const template_rules = () => {
    return [
        check('filename').notEmpty().withMessage('filename is required!')
    ]
}

const get_rules = () => {
    return [
        check('id').notEmpty().withMessage('id is required!')
        .isNumeric().withMessage('id is not numeric!')
        .isLength({max: 32}).withMessage('id is out of length!'),
    ]
}

const get_by_user_rules = () => {
    return [
        check('b_approve').notEmpty().withMessage('id is required!')
        .isBoolean().withMessage('Must be a boolean true or false')
    ]
}

const validate = async (req, res, next) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({
            status: '98',
            message: 'Invalid value!',
            data:  errors.array()
        });
    }
    console.log("[validator] Validation : ok")
    req = req.body
    next()
}

module.exports = {
    post_rules,
    get_rules,
    update_rules,
    delete_rules,
    validate,
    template_rules,
    approv_rules,
    get_by_user_rules
}