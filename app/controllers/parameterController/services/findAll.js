const service = async (trx) => {

    let rows = await trx
        .select(
		"tms.i_id",
		trx.raw("TRIM(tms.c_setting)"),
		"tms.n_setting",
		"tms.e_setting",
		"tms.e_desc",
		"tms.b_active",
		"tms.c_status",
		"tms.i_created_by",
		"tms.n_created_by",
		trx.raw("TO_CHAR(tms.d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"))
        .from('public.t_m_setting as tms')
		.where({
			"tms.c_status": "A"
		})
		.orderBy('i_id', 'ASC')

    if (!rows) return false

    return rows
}

module.exports = service;