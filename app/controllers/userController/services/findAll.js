const service = async (trx) => {

    let rows = await trx
        .select("tmu.i_id",
		"tmu.n_username",
		"tmu.e_fullname",
		"tmu.e_email",
		"tmu.e_phone_number",
		"tmu.i_group",
		"tmg.n_group",
		"tmu.c_status",
		"tmu.b_active",
		"tmu.i_created_by",
		"tmu.n_created_by",
		trx.raw("TO_CHAR(tmu.d_created_at, 'YYYY-MM-DD HH:mm:SS') AS d_created_at"))
        .from('public.t_m_user as tmu')
        .leftJoin('public.t_m_group as tmg', function () {
            this.on('tmg.i_id', '=', 'tmu.i_group')
        })
		.where({
			"tmu.c_status": "A"
		})
		.orderBy('i_id', 'ASC')

    if (!rows) return false

    return rows
}

module.exports = service;