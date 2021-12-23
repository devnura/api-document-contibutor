const service = async (body, before, trx) => {

    console.log('[*] Getting t_m_user...', body, before)
    
    let validasi = {}
    
    validasi.e_email = await trx('public.t_m_user as tmu')
        .first("tmu.e_email")
        .where({
            "tmu.b_active": true,
			"tmu.d_deleted_at": null,
            'tmu.e_email': body.e_email
        })
        .whereNot("tmu.e_email", before.e_email)
    
    validasi.e_phone_number = await trx('public.t_m_user as tmu')
        .first("tmu.e_phone_number")
        .where({
            "tmu.b_active": true,
			"tmu.d_deleted_at": null,
            'tmu.e_phone_number': body.e_phone_number
        })
        .whereNot("tmu.e_phone_number", before.e_phone_number)

    return validasi
}

module.exports = service;