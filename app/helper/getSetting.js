
const helper = async (c_setting, trx) => {
console.log("get setting : ", c_setting)
    let rows = await trx
    .select([
        "i_id",
        "c_setting",
        "n_setting",
        "e_setting",
        "e_desc",
    ])
    .from('public.t_m_setting as tms')
    .where({
        "tms.c_setting": c_setting,
        "tms.b_active": true,
        "tms.c_status": "A",
    })
    .first()
console.log("res : ",rows)
if (!rows) return false

return rows

}

module.exports = helper;