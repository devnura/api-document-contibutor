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

const checkCreate = require('./services/checkCreate')
const checkUpdate = require('./services/checkUpdate')
const changeActive = require('./services/changeActive')

exports.findSetting = async (req, res) => {

    console.log("Method name : findSetting")
    try {
            let setting = await findAll(db);

            if (!setting) {
                return res.status(200).send({
                    status: "01",
                    message: "Setting tidak ditemukan !",
                    data: {}
                })
            }

            return res.status(200).send({
                status: "00",
                message: "Suksess",
                data: setting
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

exports.findSettingById = async (req, res) => {

    console.log("[*] Method name : findSettingById")
    try {

            let user = await find(req.params, db);

            if (!user) {
                return res.status(200).send({
                    status: "01",
                    message: "Setting tidak ditemukan !",
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

exports.createSetting = async (req, res) => {

    console.log("[*] Method name : createSetting")

    try {

        let check = await checkCreate(req.body, db)

        if(check.c_setting){
            return res.status(200).send({
                status: "02",
                message: "KODE SETTING TELAH DIGUNAKAN !",
                data: {}
            })
        }

        let setting = await create(req.body, db, req.payload);

        if (!setting) {
            return res.status(200).send({
                status: "01",
                message: "SETTING GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "SETTING BERHASIL DISIMPAN",
            data: setting
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

exports.updateSetting = async (req, res) => {

    console.log("[*] Method name : updateSetting")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == "X"){
            return res.status(200).send({
                status: "02",
                message: "SETTING TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let check = await checkUpdate(req.body, before, db)

        if(check.c_setting){
            return res.status(200).send({
                status: "03",
                message: "KODE TELAH DIGUNAKAN !",
                data: {}
            })
        }

        let setting = await update(req.params, req.body, db, req.payload);

        if (!setting) {
            return res.status(200).send({
                status: "01",
                message: "SETTING GAGAL DISIMPAN !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "SETTING BERHASIL DISIMPAN",
            data: setting
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

exports.deleteSettingById = async (req, res) => {

    console.log("[*] Method name : deleteSettingById")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == "X"){
            return res.status(200).send({
                status: "02",
                message: "SRTTING TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let setting = await softDelete(req.params, db, req.payload);

        if (!setting) {
            return res.status(200).send({
                status: "01",
                message: "SETTING GAGAL DIHAPUS !",
                data: {}
            })
        }

        return res.status(200).send({
            status: "00",
            message: "SETTING BERHASIL DIHAPUS",
            data: setting
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

exports.setActive = async (req, res) => {
    
    console.log("Method name : setActive")
    try {

        let setting = await find(req.params, db);

        if (!setting || setting.c_status == "X") {
            return res.status(200).send({
                status: "01",
                message: "SETTING TIDAK DITEMUKAN !",
                data: {}
            })
        }

        let newData = await changeActive(req.params, req.body, db, req.payload)

        return res.status(200).send({
            status: "00",
            message: "SUKSESS",
            data: newData
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