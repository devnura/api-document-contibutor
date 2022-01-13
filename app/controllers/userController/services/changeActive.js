const moment = require('moment')

const service = async (params, body, trx, payload) => {

    let rows = await trx("public.t_m_user").update({
		e_fullname: body.e_fullname,
		e_email: body.e_email,
		e_phone_number: body.e_phone_number,
		i_group: body.i_group,
		i_updated_by: payload.i_id,
		n_updated_by: payload.e_fullname,
		d_updated_at: moment()
	}, ["i_id", "n_username"])
	.where({"i_id" : params.id})

    if (!rows) return false

    return rows
}

module.exports = service;