const service = async (params, trx) => {

    let rows = await trx
        .select(
		"tms.i_id",
		trx.raw("TRIM(tms.c_setting) AS c_setting"),
		"tms.n_setting",
		"tms.e_setting",
		"tms.e_desc",
		"tms.b_active",
		"tms.c_status",
		"tms.i_created_by",
		"tms.n_created_by",
		trx.raw("TO_CHAR(tms.d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
		"tms.i_updated_by",
		"tms.n_updated_by",
		trx.raw("TO_CHAR(tms.d_updated_at, 'YYYY-MM-DD HH:mm:SS') AS d_updated_at"),
		"tms.i_deleted_by",
		"tms.n_deleted_by",
		trx.raw("TO_CHAR(tms.d_deleted_at, 'YYYY-MM-DD HH:mm:SS') AS d_deleted_at"),
		
		)
        .from('public.t_m_setting as tms')
		.where({
			"tms.i_id": params.id
		})
		.orderBy('i_id', 'ASC')
		.first()

    if (!rows) return false

    return rows
}

module.exports = service;