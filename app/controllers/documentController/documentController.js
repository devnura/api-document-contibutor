/*
    Config
 */
const db = require('../../config/database')

/*
    Services
 */
const findAll = require('./services/findAll')
const find = require('./services/find')
const findByUser = require('./services/findByUser')
const create = require('./services/create')
const update = require('./services/update')
const softDelete = require('./services/delete')
const approve = require('./services/approve')

const checkCreate = require('./services/checkCreate')
const checkUpdate = require('./services/checkUpdate')

/*
    Helper
 */

const getSetting = require('../../helper/getSetting')

exports.findDocument = async (req, res) => {

    console.log("[*] Method name : findDocument")
    try {

            let document = await findAll(db);

            if (!document) {
                return res.status(200).send({
                    status: "01",
                    message: "DOKUMEN TIDAK DITEMUKAN !",
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

            let document = await find(req.params, db, true);

            if (!document) {
                return res.status(200).send({
                    status: "01",
                    message: "DOKUMEN TIDAK DITEMUKAN !",
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

exports.findDocumentByUser = async (req, res) => {

    console.log("[*] Method name : findDocumentByUser")
    try {

            let document = await findByUser(req.payload, db);

            if (!document) {
                return res.status(200).send({
                    status: "01",
                    message: "DOKUMEN TIDAK DITEMUKAN !",
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

    console.log("[*] Method name : createDocument")
    try {
        let check = await checkCreate(req.body, db)
        if(check.n_group){
            return res.status(200).send({
                status: "02",
                message: "NAMA DOKUMEN TELAH DIGUNAKAN !",
                data: {}
            })
        }

        const setting = await getSetting('APIKEY02', db)
        if(!setting){
            return res.status(200).send({
                status: "03",
                message: "DOKUMEN GAGAL DISIMPAN HARAP HUBUNGI ADMINISTRATOR !",
                data: {}
            })
        }

        let role = await create(req.body, db, req.payload, setting);

        if (!role) {
            return res.status(200).send({
                status: "01",
                message: "DOKUMEN GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "DOKUMEN BERHASIL DISIMPAN",
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

        let before = await find(req.params, db)

        if(!before || before.c_status == 'X'){
            return res.status(200).send({
                status: "02",
                message: "DOKUMEN TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let check = await checkUpdate(req.body, before, db)

        if(check.e_tittle){
            return res.status(200).send({
                status: "03",
                message: "NAMA DOKUMEN TELAH DIGUNAKAN !",
                data: {}
            })
        }

        if(before.i_current_stat != '0'){
            return res.status(200).send({
                status: "04",
                message: "DOKUMEN YANG SEDANG DIPROSES TIDAK DAPAT DU UBAH!",
                data: {}
            })
        }

        let user = await update(req.params, req.body, db, req.payload);

        if (!user) {
            return res.status(200).send({
                status: "01",
                message: "DOKUMEN GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "DOKUMEN BERHASIL DISIMPAN",
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
                message: "DOKUMEN GAGAL DIHAPUS !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "DOKUMEN BERHASIL DIHAPUS",
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

exports.getDocumentTemplate = async (req, res) => {

    console.log("[*] Method name : getDocumentTemplate")
    try {

        const file = `./doc-files/${req.params.filename}`;
        
        return res.status(200).download(file);

    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: '99',
            message: "Terjadi kesalahan system !",
            data: {}
        })
    }
}

exports.approveDocument = async (req, res) => {

    console.log("[*] Method name : approvDocument")
    try {

        let doc = await approve(req.body, db, req.payload);

        if (!doc) {
            return res.status(200).send({
                status: "01",
                message: "DOKUMEN GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "DOKUMEN BERHASIL DISIMPAN",
            data: doc
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