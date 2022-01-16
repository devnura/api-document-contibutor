const service = async (params, trx, withBase64 = false) => {
	let rows = {}
	if(withBase64){
		rows = await trx
        .select([
			"i_id",
			"c_document_code",
			"e_tittle",
			"c_desc",
			"c_status",
			"q_contributor",
			"i_current_stat",
			"b_active",
			"i_created_by",
			"n_created_by",
			trx.raw("TO_CHAR(d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
			"i_updated_by",
			"n_updated_by",
			trx.raw("TO_CHAR(d_updated_at, 'YYYY-MM-DD HH:mm:SS') AS d_updated_at"),
			"i_deleted_by",
			"n_deleted_by",
			trx.raw("TO_CHAR(d_deleted_at, 'YYYY-MM-DD HH:mm:SS') AS d_deleted_at"),
			"e_encode_document"
		])
        .from('doc.t_d_document as tdd')
		.where({
			"i_id": params.id
		})
		.first()
	} else {
		rows = await trx
        .select([
			"i_id",
			"c_document_code",
			"e_tittle",
			"c_desc",
			"c_status",
			"q_contributor",
			"i_current_stat",
			"b_active",
			"i_created_by",
			"n_created_by",
			trx.raw("TO_CHAR(d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
			"i_updated_by",
			"n_updated_by",
			trx.raw("TO_CHAR(d_updated_at, 'YYYY-MM-DD HH:mm:SS') AS d_updated_at"),
			"i_deleted_by",
			"n_deleted_by",
			trx.raw("TO_CHAR(d_deleted_at, 'YYYY-MM-DD HH:mm:SS') AS d_deleted_at")
		])
        .from('doc.t_d_document as tdd')
		.where({
			"i_id": params.id
		})
		.first()
	}


    if (!rows) return false

	let details = await trx('doc.t_d_document_detail as tdd')
		.select([
			"tdd.i_id",
			"tdd.i_user",
			"tmu.e_fullname",
			"tmg.n_group",
			"tmu.e_email",
			"tdd.i_stat",
			"tdd.b_approve",
			"tdd.c_note",
			"tdd.d_approve_at"
		])
		.leftJoin('public.t_m_user as tmu', function () {
            this.on('tdd.i_user', '=', 'tmu.i_id')
        })
		.leftJoin('public.t_m_group as tmg', function () {
            this.on('tmu.i_group', '=', 'tmg.i_id')
        })
		.where({
			"c_document_code": rows.c_document_code
		})
		
		return {...rows, ...{detail : details}}

}

module.exports = service;