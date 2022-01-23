const { docxToPdfFromBase64 , initIva } = require("iva-converter");

const service = async (body, trx, payload, setting) => {

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

	if(detail.length < 1){
		return false
	}

	let docType = body.e_encode_document.split(",")
	let resBase64 = body.e_encode_document

	if(docType[0] == "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64"){

		console.log("[*] Converting Document ")

		initIva(setting.e_setting);

		const pdfFile = await docxToPdfFromBase64('base64docx.docx', body.e_encode_document)

		let result = Buffer.from(pdfFile).toString('base64')

		resBase64 = 'data:application/pdf;base64,' + result
	}



	const rows =  await trx("doc.t_d_document").update({
		"i_current_stat": detail[0].i_stat,
		"e_encode_document": resBase64,
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

	const currentStat = await trx
	.first([
		"tddd.i_stat",
		"tmu.e_phone_number",
		"tmu.e_fullname",
		"tddd.d_approve_at"
	])
	.from('doc.t_d_document_detail as tddd')
	.leftJoin('public.t_m_user as tmu', function () {
		this.on('tddd.i_user', '=', 'tmu.i_id')
	})
	.where("tddd.i_stat", "=", rows[0].i_current_stat)
	.where({
		"tddd.c_document_code" : rows[0].c_document_code,
	})
	.orderBy("i_stat", "ASC")

	let doc = rows[0]

	return {
		doc, nextStat, currentStat
	}

}


module.exports = service;