const {
    check,
    validationResult
} = require('express-validator')

const post_rules = () => {
    return [
        check('i_group').notEmpty().isNumeric().withMessage('i_group is required!')
            .isLength({max: 8}).withMessage('i_group is out of length!'),
        check('n_username').notEmpty().withMessage('n_username is required!')
            .isLength({max: 16}).withMessage('n_username is out of length!'),
        check('e_password').notEmpty().withMessage('e_password is required!')
            .isLength({max: 16}).withMessage('e_password is out of length!'),
        check('e_fullname').notEmpty().withMessage('e_fullname is required!')
            .isLength({max: 64}).withMessage('e_fullname is out of length!'),
        check('e_email').notEmpty().withMessage('e_email is required!')
            .isEmail().withMessage('e_email is invalid!')
            .isLength({max: 64}).withMessage('e_email is out of length!'),
        check('e_phone_number').notEmpty().withMessage('e_phone_number is required!')
            .isLength({max: 14, min: 11}).withMessage('e_phone_number is out of length!'),
    ]
}

const update_rules = () => {
    return [
        check('id').notEmpty().withMessage('id is required!')
            .isNumeric().withMessage('id is not numeric!')
            .isLength({max: 8}).withMessage('id is out of length!'),
        check('i_group').notEmpty().isNumeric().withMessage('i_group is required!')
            .isLength({max: 8}).withMessage('i_group is out of length!'),
        check('n_username').notEmpty().withMessage('n_username is required!')
            .isLength({max: 16}).withMessage('n_username is out of length!'),
        check('e_fullname').notEmpty().withMessage('e_fullname is required!')
            .isLength({max: 64}).withMessage('e_fullname is out of length!'),
        check('e_email').notEmpty().withMessage('e_email is required!')
            .isEmail().withMessage('e_email is invalid!')
            .isLength({max: 64}).withMessage('e_email is out of length!'),
        check('e_phone_number').notEmpty().withMessage('e_phone_number is required!')
            .isLength({max: 13}).withMessage('e_phone_number is out of length!'),
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