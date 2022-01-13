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

exports.findDocument = async (req, res) => {

    console.log("[*] Method name : findDocument")
    try {

            let document = await findAll(req.body, db);

            if (!document) {
                return res.status(200).send({
                    status: "01",
                    message: "DOCUMENT TIDAK DITEMUKAN !",
                    data: {}
                })
            }

            return res.status(200).send({
                status: "00",
                message: "SUKSES",
                data: document
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

exports.findDocumentById = async (req, res) => {

    console.log("[*] Method name : findDocumentById")
    try {

            let document = await find(req.params, db);

            if (!document) {
                return res.status(200).send({
                    status: "01",
                    message: "DOCUMENT TIDAK DITEMUKAN !",
                    data: {}
                })
            }

            return res.status(200).send({
                status: "00",
                message: "SUKSES",
                data: document
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

exports.createDocument = async (req, res) => {

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

exports.updateDocument = async (req, res) => {

    console.log("[*] Method name : updateDocument")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == 'X'){
            return res.status(200).send({
                status: "02",
                message: "DOCUMENT TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let check = await checkRoleUpdate(req.body, before, db)

        if(check.n_role){
            return res.status(200).send({
                status: "03",
                message: "NAMA DOCUMENT TELAH DIGUNAKAN !",
                data: {}
            })
        }

        let user = await update(req.params, req.body, db, req.payload);

        if (!user) {
            return res.status(200).send({
                status: "01",
                message: "DOCUMENT GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "DOCUMENT BERHASIL DISIMPAN",
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

exports.deleteDocumentById = async (req, res) => {

    console.log("[*] Method name : deleteDocumentById")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == 'X'){
            return res.status(200).send({
                status: "02",
                message: "DOCUMENT TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let document = await softDelete(req.params, db, req.payload);

        if (!document) {
            return res.status(200).send({
                status: "01",
                message: "DOCUMENT GAGAL DIHAPUS !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "DOCUMENT BERHASIL DIHAPUS",
            data: document
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