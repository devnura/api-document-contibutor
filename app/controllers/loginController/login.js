require('dotenv').config()
const moment = require('moment')
const {
    ACCESS_TOKEN_SECRET
} = require('../../config/secret')

/*
    Config
 */
const jwt = require('jsonwebtoken')
const db = require('../../config/database')

/*
    Services
 */
const getUserByUsername = require('./services/getUserByUsername')
const checkPassword = require('./services/checkPassword')
const setLogin = require('./services/setLogin')

const controller = async (req, res) => {
    try {

        let {username, password} = req.body || ""

        // Transaction begin

        await db.transaction(async trx => {
            
            // getting user
            let user = await getUserByUsername(username, trx);
            if (!user) {
                return res.status(200).send({
                    status: "01",
                    message: "Invalid Username !",
                    data: {}
                })
            }

            // checking password
            let matchPassword = await checkPassword(user, password);
            if (!matchPassword) {
                return res.status(200).send({
                    status: "02",
                    message: "Invalid Password !",
                    data: {}
                })
            }
            console.log("Ini User", user)
            let login = await setLogin(user, 'S', trx)

            let d_login = moment(login).format('YYYY-MM-DD')

            let token = jwt.sign({
                i_id: user.i_id,
                n_username: user.n_username,
                e_fullname: user.e_fullname,
                i_group: user.i_group,
                d_login: d_login,
            }, ACCESS_TOKEN_SECRET, {
                expiresIn: '24h'
            });

            return res.status(200).send({
                status: "00",
                message: "Suksess",
                data: {
                    n_username: user.n_username,
                    e_fullname: user.e_fullname,
                    i_group: user.i_group,
                    n_group: user.n_group,
                    d_login: d_login,
                    token
                }
            })

        })

    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: '99',
            message: "Terjadi kesalahan system !",
            data: {}
        })
    }
}

module.exports = controller;