const {
    check,
    validationResult
} = require('express-validator')

const post_rules = () => {
    return [
        check('n_group').notEmpty().withMessage('n_group is required!')
            .isLength({max: 32}).withMessage('n_group is out of length!'),
        check('e_desc').notEmpty().withMessage('e_desc is required!')
            .isLength({max: 64}).withMessage('e_desc is out of length!'),
    ]
}

const update_rules = () => {
    return [
        check('id').notEmpty().withMessage('id is required!')
            .isNumeric().withMessage('id is not numeric!')
            .isLength({max: 8}).withMessage('id is out of length!'),
        check('n_group').notEmpty().withMessage('n_group is required!')
            .isLength({max: 32}).withMessage('n_group is out of length!'),
        check('e_desc').notEmpty().withMessage('e_desc is required!')
            .isLength({max: 64}).withMessage('e_desc is out of length!'),
    ]
}

const delete_rules = () => {
    return [
        check('id').notEmpty().withMessage('id is required!')
            .isNumeric().withMessage('id is not numeric!')
            .isLength({max: 8}).withMessage('id is out of length!'),
    ]
}

const get_rules = () => {
    return [
        check('id').notEmpty().withMessage('id is required!')
            .isNumeric().withMessage('id is not numeric!')
            .isLength({max: 8}).withMessage('id is out of length!'),
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
    validate
}