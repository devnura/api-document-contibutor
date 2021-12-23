const service = async (params, trx) => {

    console.log('[*] Getting t_m_user...')

    let rows = await trx
        .first("tmu.i_id",
		"tmu.n_username",
		"tmu.e_fullname",
		"tmu.e_email",
		"tmu.e_phone_number",
		"tmu.i_group",
		"tmg.n_group",
		"tmu.i_created_by",
		"tmu.n_created_by",
		trx.raw("TO_CHAR(tmu.d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"),
		"tmu.i_updated_by",
		"tmu.n_updated_by",
		trx.raw("TO_CHAR(tmu.d_updated_at, 'YYYY-MM-DD HH:mm:SS') AS d_updated_at"),
		"tmu.i_deleted_by",
		"tmu.n_deleted_by",
		trx.raw("TO_CHAR(tmu.d_deleted_at, 'YYYY-MM-DD HH:mm:SS') AS d_deleted_at"),
		"tmu.b_active")
        .from('public.t_m_user as tmu')
        .leftJoin('public.t_m_group as tmg', function () {
            this.on('tmg.i_id', '=', 'tmu.i_group')
        })
        .where({
            "tmu.b_active": true,
            "tmu.i_id": params.id,
			"tmu.d_deleted_at": null
        })

    if (!rows) return false

    return rows
}

module.exports = service;