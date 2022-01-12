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

const checkRoleCreate = require('./services/checkRoleCreate')
const checkRoleUpdate = require('./services/checkRoleUpdate')

exports.findRole = async (req, res) => {

    console.log("[*] Method name : findRole")
    try {

            let user = await findAll(req.body, db);

            if (!user) {
                return res.status(200).send({
                    status: "01",
                    message: "ROLE TIDAK DITEMUKAN !",
                    data: {}
                })
            }

            return res.status(200).send({
                status: "00",
                message: "SUKSES",
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

exports.findRoleById = async (req, res) => {

    console.log("[*] Method name : findRoleById")
    try {

            let user = await find(req.params, db);

            if (!user) {
                return res.status(200).send({
                    status: "01",
                    message: "ROLE TIDAK DITEMUKAN !",
                    data: {}
                })
            }

            return res.status(200).send({
                status: "00",
                message: "SUKSES",
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

exports.createRole = async (req, res) => {

    console.log("[*] Method name : createRole")
    try {
        let check = await checkRoleCreate(req.body, db)
        console.log(check)
        if(check.n_group){
            return res.status(200).send({
                status: "02",
                message: "NAMA ROLE TELAH DIGUNAKAN !",
                data: {}
            })
        }

        let role = await create(req.body, db, req.payload);

        if (!role) {
            return res.status(200).send({
                status: "01",
                message: "ROLE GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "ROLE BERHASIL DISIMPAN",
            data: role
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

exports.updateRole = async (req, res) => {

    console.log("[*] Method name : updateRole")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == 'X'){
            return res.status(200).send({
                status: "02",
                message: "ROLE TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let check = await checkRoleUpdate(req.body, before, db)

        if(check.n_role){
            return res.status(200).send({
                status: "03",
                message: "NAMA ROLE TELAH DIGUNAKAN !",
                data: {}
            })
        }

        let user = await update(req.params, req.body, db, req.payload);

        if (!user) {
            return res.status(200).send({
                status: "01",
                message: "USER GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "ROLE BERHASIL DISIMPAN",
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

exports.deleteRoleById = async (req, res) => {

    console.log("[*] Method name : deleteRoleById")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == 'X'){
            return res.status(200).send({
                status: "02",
                message: "ROLE TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let role = await softDelete(req.params, db, req.payload);

        if (!role) {
            return res.status(200).send({
                status: "01",
                message: "ROLE GAGAL DIHAPUS !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "ROLE BERHASIL DIHAPUS",
            data: role
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