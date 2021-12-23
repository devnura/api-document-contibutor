const moment = require('moment')

const service = async (params, body, trx) => {

    console.log('[*] Creating new user...')

    let rows = await trx("public.t_m_user").update({
		e_fullname: body.e_fullname,
		e_email: body.e_email,
		e_phone_number: body.e_phone_number,
		i_group: body.i_group,
		i_updated_by: 1,
		n_updated_by: "hard code",
		d_updated_at: moment()
	}, ["i_id", "n_username"])
	.where({"i_id" : params.id})

    if (!rows) return false

    return rows
}

module.exports = service;