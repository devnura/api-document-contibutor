const {
    validationResult
} = require('express-validator')

/*
    Config
 */
const db = require('../../config/database')

/*
    Services
*/
const checkPassword = require('./services/checkPassword')
const getUserByUsername = require('./services/getUserByUsername')

const controller = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(200).send({
        status: '98',
        message: errors.array()[0].msg,
        data: {}
    }); //422

    try {

        let {
            body
        } = req || ""

        await db.transaction(async trx => {

            const user = await getUserByUsername(body.username, trx)
            if(!user) {
                return res.status(200).send({
                    status: "02",
                    message: "Invalid Username/Password !",
                    data: {}
                })
            }

            const password = checkPassword(user, body.password)
            if(!password){
                return res.status(200).send({
                    status: "02",
                    message: "Invalid Username/Password !",
                    data: {}
                })
            }

            const terminal = await getTerminal(body.c_pos, trx)
            if(!terminal){
                return res.status(200).send({
                    status: "03",
                    message: "Invalid Terminal Code !",
                    data: {}
                })
            }

            const loginBefore = await checkLoginBefore(user, trx)
            if (!loginBefore) {
                return res.status(200).send({
                    status: "04",
                    message: "Belum Melakukan Openshift !",
                    data: {}
                })
            }

            let closeshift = await closeShift(req.c_login, terminal, user, trx);
            if (!closeshift) {
                return res.status(200).send({
                    status: "01",
                    message: "Failed",
                    data: {}
                })
            }

            return res.status(200).send({
                status: "00",
                message: "Success",
                data: {}
            })
        })

    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: '99',
            message: "Terjadi Kesalahan System !",
            data: {}
        })
    }
}

module.exports = controller;