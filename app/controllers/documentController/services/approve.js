const moment = require('moment')

const service = async (body, trx, payload) => {

	const detail = await trx("doc.t_d_document_detail")
	.update({
		"b_approve": true,
		"c_note": body.c_note,
		"d_approve_at": moment()
	}, ['i_stat', 'c_document_code'])
	.where({
		"c_document_code" : body.c_document_code,
		"i_user": payload.i_id
	})

	const rows =  await trx("doc.t_d_document").update({
		"i_current_stat": detail[0].i_stat ,
	}, ["i_id", "c_document_code"])
	.where({
		"c_document_code": detail[0].c_document_code
	})
	console.log("2 : ", rows)
	return rows
}


module.exports = service;