const bcrypt = require("bcrypt");

const service = async (body, trx) => {

	// generate salt to hash password
	const salt = await bcrypt.genSalt(10);
	// now we set user password to hashed password
	body.e_password = await bcrypt.hash(body.e_password, salt);

    let rows = await trx("public.t_m_user").insert({
		n_username: body.n_username,
		e_fullname: body.e_fullname,
		e_password: body.e_password,
		e_email: body.e_email,
		e_phone_number: body.e_phone_number,
		i_group: body.i_group,
		i_created_by: 1,
		n_created_by: "hard code"
	}, ["i_id", "n_username"])

    if (!rows) return false

    return rows
}

module.exports = service;