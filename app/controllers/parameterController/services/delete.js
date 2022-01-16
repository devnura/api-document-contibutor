const moment = require('moment')

const service = async (params, trx, payload) => {

    let rows = await trx('public.t_m_setting').update({
        "c_status": "X",
        "b_active": false,
		"i_deleted_by" : payload.i_id,
		"n_deleted_by" : payload.e_fullname,
		"d_deleted_at": moment()
		}, ['i_id', 'n_setting'])
        .where({
        "i_id": params.id,
        })

    if (!rows) return false

    return rows
}

module.exports = service;