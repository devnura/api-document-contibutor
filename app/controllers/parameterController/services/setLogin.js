const service = async (user, c_status, trx) => {
    
    let loginBefore = await trx('public.t_d_login').first('n_username')
    .where({
        n_username : user.n_username,
        c_status : 'S',
        b_active: true
    })

    if(loginBefore){
        await trx('public.t_d_login').update({
            b_active: false
        }).where({
            n_username : user.n_username,
            c_status : 'S',
            b_active: true
        })
    }
    
    console.log('[*] INSERTING LOGIN')
    
    let rows = await trx('public.t_d_login').insert({
        n_username : user.n_username,
        e_fullname : user.e_fullname,
        c_status : c_status,
    }, "d_login")

    if(rows) console.log('[*] ID STOCK : ', rows)

    return rows[0]
}

module.exports = service;