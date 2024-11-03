const { getDb, initDb } = require('./db')
require('dotenv').config()

async function getConfig() {
    const db = getDb()
    return db.collection('config').findOne({})
}

async function main() {
    await initDb(process.env.DB_NAME)

    let config = await getConfig()
    console.log(config)
}

main()
