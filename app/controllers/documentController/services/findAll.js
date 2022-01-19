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
			"q_contributor",
			"i_current_stat",
			"i_created_by",
			"n_created_by",
			"d_created_at",
			trx.raw("TO_CHAR(d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
		])
        .from('doc.t_d_document as tdd')
		.where(
			'tdd.c_status', "=", "A"
		)
		.orderBy("i_id", "ASC") 

    if (!rows) return false

    return rows
}

module.exports = service;