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
const getRole = require('../roleController/services/find')

const checkUserCreate = require('./services/checkUserCreate')
const checkUserUpdate = require('./services/checkUserUpdate')
const changePassword = require('./services/changePassword')
const changeActive = require('./services/changeActive')

/*
    Helper
 */
const getSetting = require('../../helper/getSetting')
const sendWhatsAppNotify = require('../../helper/sendWhatsAppNotify')

exports.findUser = async (req, res) => {

    console.log("Method name : findUser")
    try {
            let user = await findAll(db);

            if (!user) throw {
                status: '01',
                message: "User tidak ditemukan !",
                data: {}
            }

            return res.status(200).send({
                status: "00",
                message: "Suksess",
                data: user
            })


    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
			status: e.status,
			message: e.message,
			data: e.data
        })
    }
}

exports.findUserById = async (req, res) => {

    console.log("[*] Method name : findUserById")
    try {

            let user = await find(req.params, db);

            if (!user) throw {
                status: '01',
                message: "User tidak ditemukan !",
                data: {}
            }

            return res.status(200).send({
                status: "00",
                message: "Suksess",
                data: user
            })


    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({
			status: e.status,
			message: e.message,
			data: e.data
		})
    }
}

exports.createUser = async (req, res) => {

    console.log("[*] Method name : createUser")

    try {

        await db.transaction(async trx => {

            let check = await checkUserCreate(req.body, trx)

            if(check.n_username) throw {
                status: "02",
                message: "USERNAME TELAH DIGUNAKAN !",
                data: {}
            }

            if(check.e_email) throw {
                    status: "03",
                    message: "EMAIL TELAH DIGUNAKAN !",
                    data: {}
            }

            if(check.e_phone_number) throw {
                    status: "04",
                    message: "NOMOR TELAH DIGUNAKAN !",
                    data: {}
            }

            let user = await create(req.body, trx, req.payload);

            if (!user) throw {
                    status: "01",
                    message: "USER GAGAL DISIMPAN !",
                    data: {}
            }

            res.status(200).send({
                status: "00",
                message: "USER BERHASIL DISIMPAN",
                data: user
            })
            
            const settingTtalk = await getSetting('APIKEY01', trx)

            const linkUrl = await getSetting('WEBURL', trx)

            const settingWa = await getSetting("NOTWA02",trx)

            const role = await getRole(user.i_group, trx)

            if(settingTtalk && linkUrl && settingWa && role){

                const content = `${settingWa.e_setting} \n\nNama : ${user.e_fullname} \nRole : ${role.n_role} \nUsername : ${user.n_username} \nPassword : ${req.body.e_password}  \nLink : ${linkUrl.e_setting}`
                
                await sendWhatsAppNotify(user.e_phone_number, content, settingTtalk)
                
            }
        })

    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: e.status,
			message: e.message,
			data: e.data
        })
    }
}

exports.updateUser = async (req, res) => {

    console.log("[*] Method name : updateUser")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == "X") throw {
            status: "02",
            message: "USER TIDAK DITEMUKAN !",
            data: {}
        }

        let check = await checkUserUpdate(req.body, before, db)

        if(check.e_email) throw {
            status: "03",
            message: "EMAIL TELAH DIGUNAKAN !",
            data: {}
        }

        if(check.e_phone_number) throw {
            status: "04",
            message: "NOMOR TELAH DIGUNAKAN !",
            data: {}
        }

        let user = await update(req.params, req.body, db, req.payload);

        if (!user) throw {
            status: "01",
            message: "USER GAGAL DISIMPAN !",
            data: {}
        }

        return res.status(200).send({
            status: "00",
            message: "USER BERHASIL DISIMPAN",
            data: user
        })

    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: e.status,
			message: e.message,
			data: e.data
        })
    }
}

exports.deleteUserById = async (req, res) => {

    console.log("[*] Method name : deleteUserById")
    try {

        let before =  await find(req.params, db)

        if(!before || before.c_status == "X") throw {
            status: "02",
            message: "USER TIDAK DITEMUKAN !",
            data: {}
        }

        let user = await softDelete(req.params, db, req.payload);

        if (!user) throw {
            status: "01",
            message: "USER GAGAL DIHAPUS !",
            data: {}
        }

        return res.status(200).send({
            status: "00",
            message: "USER BERHASIL DIHAPUS",
            data: user
        })

    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: e.status,
			message: e.message,
			data: e.data
        })
    }
}

exports.setPassword = async (req, res) => {
    
    console.log("Method name : setPassword")

    try {

        let user = await find(req.params, db);

        if (!user) throw {
            status: "01",
            message: "User tidak ditemukan !",
            data: {}
        }

        let newData = await changePassword(req.params, req.body, db, req.payload)

        const settingTtalk = await getSetting('APIKEY01', db)

        const linkUrl = await getSetting('WEBURL', db)

        const settingWa = await getSetting("NOTWA03",db)

        if(settingTtalk && linkUrl && settingWa){

            const content = `${settingWa.e_setting}`
            
            await sendWhatsAppNotify(user.e_phone_number, content, settingTtalk)
            
        }

        return res.status(200).send({
            status: "00",
            message: "Suksess",
            data: newData
        })


    } catch (e) {
        console.error("[x] message : ", e.message)
        return res.status(200).send({ //500
            status: e.status,
			message: e.message,
			data: e.data
        })
    }
}

exports.setActive = async (req, res) => {
    
    console.log("Method name : setActive")
    try {

        let user = await find(req.params, db);

        if (!user || user.c_status == "X") throw {
            status: "01",
            message: "User tidak ditemukan !",
            data: {}
        }

        let newData = await changeActive(req.params, req.body, db, req.payload)

        return res.status(200).send({
            status: "00",
            message: "Suksess",
            data: newData
        })

    } catch (e) {
        console.error("[x] message : ", e.message)
		return res.status(200).send({
			status: e.status,
			message: e.message,
			data: e.data
		})
    }
}