const service = async (username, trx) => {
    console.log('[*] Getting t_m_user...')
    let rows = await trx.withSchema('sot')
        .first('t_m_user.i_id', 't_m_user.i_group', 't_m_group.n_group', 't_m_user.n_username', 't_m_user.e_password', 't_m_user.e_fullname', 't_m_user.b_pos', trx.raw('TRIM("c_station") AS c_station'))
        // .first('t_m_user.i_id', 't_m_user.i_group', 't_m_group.n_group', 't_m_user.n_username', 't_m_user.e_password', 't_m_user.e_fullname', 't_m_user.b_pos', db.raw('TRIM("c_station") AS c_station, TRIM("c_login") AS c_login, TRIM("c_pos") AS c_pos, t_m_user.d_login::TIMESTAMP::DATE'))
        .from('t_m_user')
        .leftJoin('t_m_group', function () {
            this.on('t_m_group.i_id', '=', 't_m_user.i_group')
        })
        .where({
            "t_m_user.n_username": username,
            "t_m_user.b_pos": true,
            "t_m_user.b_active": true
        })

    console.log('[*] Result t_m_user :', rows)

    if (!rows) return false

    return rows
}

module.exports = service;