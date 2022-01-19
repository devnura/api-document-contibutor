const service = async (params, body, trx, payload) => {

    let rows = await trx("public.t_m_setting").update({
		"c_setting" : body.c_setting.toUpperCase(),
		"n_setting" : body.n_setting,
		"e_setting" : body.e_setting,
		"e_desc" : body.e_desc,
		"i_updated_by": payload.i_id,
		"n_updated_by": payload.e_fullname,
		"d_updated_at": trx.raw('NOW()')
	}, ["i_id", "n_setting"])
	.where({"i_id" : params.id})

    if (!rows) return false

    return rows
}

module.exports = service;