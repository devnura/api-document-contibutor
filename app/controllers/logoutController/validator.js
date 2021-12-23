const {
    check,
    validationResult
} = require('express-validator')

const addstock_rules = () => {
    return [
        check('username').notEmpty().withMessage('Username harus terisi!'),
        check('password').notEmpty().withMessage('Password harus terisi')
        .isLength({
            min: 5
        }).withMessage('Password harus lebih dari 5 karakter'),
        check('c_pos').notEmpty().withMessage('Username harus terisi!'),
    ]
}

const validate = async (req, res, next) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({
            status: '98',
            message: errors.array()[0].msg,
            data: {}
        });
    }
    console.log("[validator] Validation : ok")
    req = req.body
    next()
}

module.exports = {
    addstock_rules,
    validate
}