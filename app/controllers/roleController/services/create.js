const service = async (body, trx, payload) => {

    let rows = await trx("public.t_m_group").insert({
		n_group: body.n_group.toUpperCase(),
		e_desc: body.e_desc,
		i_created_by: payload.i_id,
		n_created_by: payload.e_fullname
	}, ["i_id", "n_group"])

    if (!rows) return false

    return rows
}

module.exports = service; 