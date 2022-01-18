const service = async (payload, trx, body) => {

			let rows = await trx
			.select([
				"tdd.i_id",
				"tdd.c_document_code",
				"tdd.e_tittle",
				"tdd.c_desc",
				"tdd.c_status",
				"tddd.i_stat",
				trx.raw("TO_CHAR(tddd.d_approve_at, 'YYYY-MM-DD HH:mm:SS') AS d_approve_at"),
				"tdd.i_current_stat",
				"tdd.q_contributor",
				"tdd.b_active",
				"tdd.i_created_by",
				"tdd.n_created_by",
				trx.raw("TO_CHAR(d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
			])
			.from('doc.t_d_document as tdd')
			.leftJoin('doc.t_d_document_detail as tddd', function () {
				this.on('tdd.c_document_code', '=', 'tddd.c_document_code')

				if(!body.b_approve){
					this.on('tdd.i_current_stat', trx.raw('tddd.i_stat - 1'))
				}
				
			})
			.where({
				"tddd.i_user": payload.i_id,
				"tddd.b_approve": body.b_approve
			})
			.whereNot({
				"tdd.c_status": "X"
			})

			return rows

}

module.exports = service;