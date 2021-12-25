/*
    Config
 */
const db = require('../../config/database')

/*
    Services
 */
const findAll = require('./services/findAll')
const find = require('./services/find')
const create = require('./services/create')
const update = require('./services/update')
const softDelete = require('./services/delete')

const checkUserCreate = require('./services/checkUserCreate')
const checkUserUpdate = require('./services/checkUserUpdate')

exports.findUser = async (req, res) => {

    console.log("Method name : findUser")
    try {

            let user = await findAll(db);

            if (!user) {
                return res.status(200).send({
                    status: "01",
                    message: "User tidak ditemukan !",
                    data: {}
                })
            }

            return res.status(200).send({
                status: "00",
                message: "Suksess",
                data: user
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

exports.findUserById = async (req, res) => {

    console.log("Method name : findUserById")
    try {

            let user = await find(req.params, db);

            if (!user) {
                return res.status(200).send({
                    status: "01",
                    message: "User tidak ditemukan !",
                    data: {}
                })
            }

            return res.status(200).send({
                status: "00",
                message: "Suksess",
                data: user
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

exports.createUser = async (req, res) => {

    console.log("Method name : createUser")
    try {
        let check = await checkUserCreate(req.body, db)
        console.log(check)
        if(check.n_username){
            return res.status(200).send({
                status: "02",
                message: "USERNAME TELAH DIGUNAKAN !",
                data: {}
            })
        }

        if(check.e_email){
            return res.status(200).send({
                status: "03",
                message: "EMAIL TELAH DIGUNAKAN !",
                data: {}
            })
        }

        if(check.e_phone_number){
            return res.status(200).send({
                status: "04",
                message: "NOMOR TELAH DIGUNAKAN !",
                data: {}
            })
        }

        let user = await create(req.body, db);

        if (!user) {
            return res.status(200).send({
                status: "01",
                message: "USER GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "USER BERHASIL DISIMPAN",
            data: user
        })


    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: '99',
            message: "TERJADI KESALAHAN SYSTEM !",
            data: {}
        })
    }
}

exports.updateUser = async (req, res) => {

    console.log("Method name : updateUser")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == "X"){
            return res.status(200).send({
                status: "02",
                message: "USER TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let check = await checkUserUpdate(req.body, before, db)

        if(check.e_email){
            return res.status(200).send({
                status: "03",
                message: "EMAIL TELAH DIGUNAKAN !",
                data: {}
            })
        }

        if(check.e_phone_number){
            return res.status(200).send({
                status: "04",
                message: "NOMOR TELAH DIGUNAKAN !",
                data: {}
            })
        }

        let user = await update(req.params, req.body, db);

        if (!user) {
            return res.status(200).send({
                status: "01",
                message: "USER GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "USER BERHASIL DISIMPAN",
            data: user
        })

    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: '99',
            message: "TERJADI KESALAHAN SYSTEM !",
            data: {}
        })
    }
}

exports.deleteUserById = async (req, res) => {

    console.log("Method name : deleteUserById")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == "X"){
            return res.status(200).send({
                status: "02",
                message: "USER TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let user = await softDelete(req.params, db);

        if (!user) {
            return res.status(200).send({
                status: "01",
                message: "USER GAGAL DIHAPUS !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "USER BERHASIL DIHAPUS",
            data: user
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