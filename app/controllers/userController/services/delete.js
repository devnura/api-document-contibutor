const moment = require('moment')

const service = async (params, trx) => {

    console.log('[*] Deleteing user...')

    let rows = await trx('public.t_m_user').update({
		"i_deleted_by" : 1,
		"n_deleted_by" : 1,
		"d_deleted_at": moment()
		}, ['i_id', 'n_username'])
        .where({
        "i_id": params.id,
        })

    if (!rows) return false

    return rows
}

module.exports = service;