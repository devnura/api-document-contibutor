const service = async (body, trx, payload) => {

	const detail = await trx("doc.t_d_document_detail")
	.update({
		"b_approve": true,
		"c_note": body.c_note,
		"d_approve_at": trx.raw('NOW()')
	}, ['i_stat', 'c_document_code'])
	.where({
		"c_document_code" : body.c_document_code,
		"i_user": payload.i_id
	})

	const rows =  await trx("doc.t_d_document").update({
		"i_current_stat": detail[0].i_stat ,
	}, ["i_id", "c_document_code", "e_tittle", "i_current_stat"])
	.where({
		"c_document_code": detail[0].c_document_code
	})

	const nextStat = await trx
	.first([
		"tddd.i_stat",
		"tmu.e_phone_number",
		"tmu.e_fullname"
	])
	.from('doc.t_d_document_detail as tddd')
	.leftJoin('public.t_m_user as tmu', function () {
		this.on('tddd.i_user', '=', 'tmu.i_id')
	})
	.where("tddd.i_stat", ">", rows[0].i_current_stat)
	.where({
		"tddd.c_document_code" : rows[0].c_document_code,
	})
	.orderBy("i_stat", "ASC")

	let doc = rows[0]

	return {
		doc, nextStat
	}

}


module.exports = service;