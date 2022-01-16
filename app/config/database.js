require('dotenv').config();

module.exports = require('knex')({
    client: process.env.DB_CLIENT || 'pg',
    debug: true,
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5430,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE || 'dummy_db'
    }
})