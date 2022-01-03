const service = async (body, before, trx) => {
    
    let validasi = {}
    
        validasi.n_group = await trx('public.t_m_group as tmg')
        .first("tmg.n_group")
        .where({
            'tmg.n_group': body.n_group
        })
        .whereNot({
            "tmg.c_status": "X",
            "tmg.n_group": before.n_group
        })

    return validasi
}

module.exports = service;