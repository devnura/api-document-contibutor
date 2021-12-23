const service = async (body, before, trx) => {

    console.log('[*] Getting t_m_user...')
    
    let validasi = {}
    console.log("!",before.n_username)
    validasi.n_username = await trx('public.t_m_user as tmu')
        .first("tmu.n_username")
        .where({
            "tmu.b_active": true,
			"tmu.d_deleted_at": null,
            'tmu.n_username': body.n_username
        })
        .whereNotIn("tmu.n_username", [before.n_username])
    
    validasi.e_email = await trx('public.t_m_user as tmu')
        .first("tmu.e_email")
        .where({
            "tmu.b_active": true,
			"tmu.d_deleted_at": null,
            'tmu.e_email': body.e_email
        })
        .whereNotIn("tmu.e_email",[ before.e_email])
    
    validasi.e_phone_number = await trx('public.t_m_user as tmu')
        .first("tmu.e_phone_number")
        .where({
            "tmu.b_active": true,
			"tmu.d_deleted_at": null,
            'tmu.e_phone_number': body.e_phone_number
        })
        .whereNotIn("tmu.e_phone_number", [before.e_phone_number])

    return validasi
}

module.exports = service;