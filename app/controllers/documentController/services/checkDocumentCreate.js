const service = async (body, trx) => {
    
    let validasi = {}

    validasi.n_group = await trx('doc.t_d_document as tdd')
        .first("tdd.e_tittle")
        .where({
            'tdd.e_tittle': body.e_tittle
        })
        .whereNot({
            "tdd.c_status": "X",
        })

    return validasi
}

module.exports = service;