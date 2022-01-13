const { docxToPdfFromBase64 , initIva } = require("iva-converter");
const { writeFileSync } = require("fs");
const { basename } = require("path");

const service = async (body, trx, payload) => {
	try {

		initIva("YOUR_API_KEY");
		// if docxFileBase64String include -> data:application/pdf;base64
		// save db
		// else{
		// docxFileBase64String -> from request
		// ini docx : data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,
		// ini pdf : data:application/pdf;base64,
		const pdfFile = await docxToPdfFromBase64('base64docx.docx', docxFileBase64String)

		const resBase64 = Buffer.from(pdfFile).toString('base64')

		// save this to db
		console.log('data:application/pdf;base64,' + resBase64)
		// }
		return resBase64

	} catch (error) {
		console.log("[Error] : ", error)
		return false
	}


}

module.exports = service;  