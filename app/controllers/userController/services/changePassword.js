const bcrypt = require("bcrypt");

const service = async (params, body, trx, payload) => {

    // generate salt to hash password
	const salt = await bcrypt.genSalt(10);
	// now we set user password to hashed password
	body.e_password = await bcrypt.hash(body.e_password, salt);

    let rows = await trx("public.t_m_user").update({
		e_password: body.e_password,
		i_updated_by: payload.i_id,
		n_updated_by: payload.e_fullname,
		d_updated_at: trx.raw('NOW()')
	}, ["i_id", "n_username"])
	.where({"i_id" : params.id})

    return rows
}

module.exports = service;