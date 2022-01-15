const service = async (body, before, trx) => {
    
    let validasi = {}

        validasi.e_tittle = await trx('doc.t_d_document as tdd')
        .first("tdd.e_tittle")
        .where({
            'tdd.e_tittle': body.e_tittle
        })
        .whereNot({
            "tdd.c_status": "X",
            "tdd.e_tittle": before.e_tittle
        })

    return validasi
}

module.exports = service;