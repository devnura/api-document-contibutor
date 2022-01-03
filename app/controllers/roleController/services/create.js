const service = async (body, trx) => {

    let rows = await trx("public.t_m_group").insert({
		n_group: body.n_group.toUpperCase(),
		e_desc: body.e_desc,
		i_created_by: 1,
		n_created_by: "hard code"
	}, ["i_id", "n_group"])

    if (!rows) return false

    return rows
}

module.exports = service;