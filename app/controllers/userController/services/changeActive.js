const service = async (params, body, trx, payload) => {

    let rows = await trx("public.t_m_user").update({
		b_active: body.b_active,
		i_updated_by: payload.i_id,
		n_updated_by: payload.e_fullname,
		d_updated_at: trx.raw('NOW()')
	}, ["i_id", "n_username"])
	.where({"i_id" : params.id})

    return rows
}

module.exports = service;