const axios = require("axios");

/*
    Config
 */
const db = require('../../config/database')
const getSetting = require('../../helper/getSetting')
// const sendWhatsAppNotify = require('../../helper/sendWhatsAppNotify')

const checkConnection = require('./services/checkConnection')

exports.connectionDb= async (req, res) => {
	try {
		const connection = await checkConnection()

		if (!connection) throw {
			message: "Unable Connect To Database"
		}

		return res.status(200).send({
			status: '00',
			message: 'success',
			data: connection
		})
	} catch (e) {
		return res.status(200).send({
			status: '05',
			message: e.message,
			data: {}
		})

	}
}

exports.connectionWa= async (req, res) => {
	try {

			const apiKey = await getSetting('APIKEY01', db)

			if (!apiKey) throw {
					status: '00',
					message: "Unable Getting To Setting",
					data: {}
			}

			// await sendWhatsAppNotify(document.doc, document.nextStat, settingTtalk)

			const tapTalk = await axios.post('https://sendtalk-api.taptalk.io/api/v1/message/send_whatsapp',
			{
				"phone": req.body.e_phone_number,
				"messageType": "text",
				"body": `${req.body.content}`
			},
			 {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'API-key': apiKey.e_setting
				}
			})
	
			console.log("[TapTalk] : ", res.data)

		return res.status(200).send({
			status: '00',
			message: 'success',
			data: ""
		})

	} catch (e) {
		return res.status(200).send({
			status: e.status,
			message: e.message,
			data: e.data
		})

	}
}
