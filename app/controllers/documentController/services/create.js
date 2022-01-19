const { docxToPdfFromBase64 , initIva } = require("iva-converter");

const moment = require("moment")

const service = async (body, trx, payload, setting) => {
	try {

		
		let docType = body.e_encode_document.split(",")
		let resBase64 = body.e_encode_document
		let q_contributor = body.detail.length

		if(docType[0] == "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64"){

			console.log("[*] Converting Document ")

			initIva(setting.e_setting);

			const pdfFile = await docxToPdfFromBase64('base64docx.docx', body.e_encode_document)

			let result = Buffer.from(pdfFile).toString('base64')

			resBase64 = 'data:application/pdf;base64,' + result
		}

		let get = await trx.raw(`
				SELECT
					substring(c_document_code, 4, 8) AS code,
					substring(c_document_code, 4, 12) AS code_long
				FROM doc.t_d_document tdd
				WHERE substring(c_document_code, 4, 8) = to_char(current_date, 'YYYYMMDD')
				ORDER BY substring(c_document_code, 4, 12) DESC
				LIMIT 1;
				`)

		let prefix = "DOC"

		let c_document_code = ""

		if(get.rows.length > 0){
			c_document_code = prefix+(parseInt(get.rows[0].code_long) + 1)
		}else{
			c_document_code = prefix + moment().format("YYYYMMDD") + "001"
		}

		const rows =  await trx("doc.t_d_document").insert({
			"c_document_code": c_document_code,
			"e_encode_document": resBase64,
			"e_tittle": body.e_tittle,
			"c_desc": body.c_desc,
			"c_status": body.c_status,
			"q_contributor": q_contributor,
			"i_current_stat": 0,
			"i_created_by": payload.i_id,
			"n_created_by": payload.e_fullname,
		}, ["i_id", "c_document_code", "e_tittle", "i_current_stat"])

		let dataDetail = []
		
		body.detail.forEach((item, index) => {
			dataDetail.push ({
				c_document_code: rows[0].c_document_code,
				i_user: item.i_id,
				i_stat: index+1
			})
		})

		console.log("to Insert : ", dataDetail)

		await trx.batchInsert("doc.t_d_document_detail", dataDetail, 100)
		
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

	} catch (error) {
		console.log("[Error] : ", error)
		return false
	}


}

module.exports = service;  