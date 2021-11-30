const checkConnection = require('./services/checkConnection')
// const moment = require('moment')
const controller = async (req, res) => {
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

module.exports = controller;