const moment = require('moment')

const service = async (params, body, trx, payload) => {

	let q_contributor = body.detail.length

	const rows =  await trx("doc.t_d_document").update({
		"e_tittle": body.e_tittle,
		"c_desc": body.c_desc,
		"c_status": body.c_status,
		"q_contributor": q_contributor,
		"i_current_stat": 1,
		"i_updated_by": payload.i_id,
		"n_updated_by": payload.e_fullname,
		"d_updated_at": moment(),
	}, ["i_id", "c_document_code"])
	.where({
		"i_id": params.id
	})

	await trx("doc.t_d_document_detail").where({
		"c_document_code" : rows[0].c_document_code
	})
	.delete()

	let dataDetail = []

	body.detail.forEach((item, index) => {
		dataDetail.push ({
			c_document_code: rows[0].c_document_code,
			i_user: item.i_id,
			i_stat: index+1
		})
	})
	await trx.batchInsert("doc.t_d_document_detail", dataDetail, 100)
	
	return {
		rows
	}
}

module.exports = service;