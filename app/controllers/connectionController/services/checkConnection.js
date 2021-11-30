const db = require('../../../config/database')

const service = async () => {

    const conn = await db.raw('SELECT CURRENT_TIMESTAMP as current')
    console.log("[*] current : ", conn.rows[0])
    if (!conn) return false

    return conn.rows[0]

}

module.exports = service;