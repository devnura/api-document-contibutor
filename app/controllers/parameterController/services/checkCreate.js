const service = async (body, trx) => {
    
    let validasi = {}

    validasi.c_setting = await trx('public.t_m_setting as tms')
        .first("tms.c_setting")
        .where({
            'tms.c_setting': body.c_setting.toUpperCase()
        })
        .whereNot({
            "tms.c_status": "X"
        })

    return validasi
}

module.exports = service;