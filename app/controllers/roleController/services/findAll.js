const service = async (trx) => {

    console.log('[*] Getting t_m_role...')

    let rows = await trx
        .select([
			"i_id",
			"n_group",
			"e_desc",
			"c_status",
			"b_active",
			"i_created_by",
			"n_created_by",
			"d_created_at",
			trx.raw("TO_CHAR(d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
			"i_updated_by",
			"n_updated_by",
			trx.raw("TO_CHAR(d_updated_at, 'YYYY-MM-DD HH:mm:SS') AS d_updated_at"),
			"i_deleted_by",
			"n_deleted_by",
			trx.raw("TO_CHAR(d_deleted_at, 'YYYY-MM-DD HH:mm:SS') AS d_deleted_at")
		])
        .from('public.t_m_group as tmg')

    if (!rows) return false

    return rows
}

module.exports = service;