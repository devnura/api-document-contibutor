const moment = require('moment')

const service = async (params, trx) => {

    let rows = await trx('public.t_m_group').update({
        "c_status": "X",
        "b_active": false,
		"i_deleted_by" : 0,
		"n_deleted_by" : "hard code",
		"d_deleted_at": moment()
		}, ['i_id', 'n_group'])
        .where({
        "i_id": params.id,
        })

    if (!rows) return false

    return rows
}

module.exports = service;