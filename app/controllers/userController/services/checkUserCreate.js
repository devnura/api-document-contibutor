const service = async (body, trx) => {
    
    let validasi = {}

    validasi.n_username = await trx('public.t_m_user as tmu')
        .first("tmu.n_username")
        .where({
            'tmu.n_username': body.n_username
        })
        .whereNot({
            "tmu.c_status": "X"
        })

    validasi.e_email = await trx('public.t_m_user as tmu')
        .first("tmu.e_email")
        .where({
            'tmu.e_email': body.e_email
        })
        .whereNot({
            "tmu.c_status": "X"
        })
    
    validasi.e_phone_number = await trx('public.t_m_user as tmu')
        .first("tmu.e_phone_number")
        .where({
            'tmu.e_phone_number': body.e_phone_number
        })
        .whereNot({
            "tmu.c_status": "X"
        })

    return validasi
}

module.exports = service;