const moment = require('moment')

const service = async (params, body, trx) => {

    let rows = await trx("public.t_m_group").update({
		n_group: body.n_group,
		e_desc: body.e_desc,
		i_updated_by: 1,
		n_updated_by: "hard code",
		d_updated_at: moment()
	}, ["i_id", "n_group"])
	.where({"i_id" : params.id})

    if (!rows) return false

    return rows
}

module.exports = service;