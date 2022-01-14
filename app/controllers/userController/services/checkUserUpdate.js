const service = async (body, before, trx) => {
    console.log(body, before)
    let validasi = {}

    validasi.e_email = await trx('public.t_m_user as tmu')
        .first("tmu.e_email")
        .where({
            'tmu.e_email': body.e_email
        })
        .whereNot({
            "tmu.e_email": before.e_email,
            "tmu.c_status": "X"
        })
    
    validasi.e_phone_number = await trx('public.t_m_user as tmu')
        .first("tmu.e_phone_number")
        .where({
            'tmu.e_phone_number': body.e_phone_number
        })
        .whereNot({
            "tmu.e_phone_number": before.e_phone_number,
            "tmu.c_status": "X"
    })

    return validasi
}

module.exports = service;