const service = async (trx) => {

    console.log('[*] Getting t_d_document...')

    let rows = await trx
        .select([
			"i_id",
			"c_document_code",
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
		.where(
			'tdd.c_status', "=", "A"
		)

    if (!rows) return false

    return rows
}

module.exports = service;