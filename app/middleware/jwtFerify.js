const {
    ACCESS_TOKEN_SECRET
} = require('../config/secret')
const jwt = require('jsonwebtoken')

const middleware = (req, res, next) => {
    const authHeader = req.headers['authorization'] || null;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.status(200).send({
        status: '01',
        message: 'Unauthorized',
        data: {}
    }) //401

    // console.log(req.headers["authorization"])
    jwt.verify(token, ACCESS_TOKEN_SECRET, async (err, user) => {
        //check verifikasi token, termasuk expired

        console.log({
            "JWT Payload  ": user
        })

        if (err) return res.status(200).send({
            status: '01',
            message: err.message,
            data: {}
        }) //401

        req.payload = user

        next();
    })
}

module.exports = middleware;