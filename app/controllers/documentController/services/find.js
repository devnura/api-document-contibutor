const service = async (params, trx) => {

    let rows = await trx
        .select([
			"i_id",
			"c_document_code",
			"e_encode_document",
			"e_tittle",
			"c_desc",
			"c_status",
			"b_active",
			"i_created_by",
			"n_created_by",
			"d_created_at",
			"i_updated_by",
			"n_updated_by",
			"d_updated_at",
			"i_deleted_by",
			"n_deleted_by",
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
			"i_id": params.keyword
		})
		.orWhere({
			"c_document_code": params.keyword
		})
		.first()

    if (!rows) return false

	let details = await trx('doc.t_d_document_detail as tdd')
		.select([
			"tdd.i_id",
			"tdd.c_document_code",
			"tdd.i_user",
			"tdd.i_stat",
			"tdd.b_approve",
			"tdd.c_note",
		])
		.leftJoin('public.t_m_user as tmu', function () {
            this.on('tdd.i_user', '=', 'tmu.i_id')
        })
		.where({
			"c_document_code": rows.c_document_code
		})

    return {
		rows,
		details
	}
}

module.exports = service;