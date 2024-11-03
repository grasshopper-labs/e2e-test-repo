const { initDb } = require('./db')
const {updateConfig, getConfig} = require("./controllers/configCtrl");
const {updateConfigModel} = require("./models/Config");
require('dotenv').config()


async function main() {
    const db = await initDb(process.env.DB_NAME)

    await updateConfig(db, updateConfigModel())

    const conf = await getConfig()
    console.log(conf)
}

main()
