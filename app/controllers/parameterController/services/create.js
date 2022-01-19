const service = async (body, trx, payload) => {

    let rows = await trx("public.t_m_setting").insert({
		"c_setting" : body.c_setting.toUpperCase(),
		"n_setting" : body.n_setting,
		"e_setting" : body.e_setting,
		"e_desc" : body.e_desc,
		"b_active" : body.b_active,
		"c_status" : body.c_status,
		"i_created_by": payload.i_id,
		"n_created_by": payload.e_fullname
	}, ["i_id", "n_setting"])

    if (!rows) return false

    return rows
}

module.exports = service;