const db = require('../../../config/database')

const service = async () => {

    const conn = await db.first(db.raw(`TO_CHAR(NOW(), 'YYYY-MM-DD HH:mm:SS') AS current`))
    console.log("[*] current : ", conn)
    if (!conn) return false

    return conn

}

module.exports = service;