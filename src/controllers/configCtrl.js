const configs = require('../data/configs.json');
const {changeDb} = require("../db");

exports.getConfig = async () => {
    const db = getDb()
    return await db.collection('config').findOne({})
}

const updateConfig = async (db, updatedFields) => {
    const results = await db.collection('config').findOneAndUpdate({}, { $set:updatedFields })
    console.log(`results: ${JSON.stringify(results)}`)
}

exports.updateConfigForDB = async (conn, dbName) => {
    try {
        const db = changeDb(conn, dbName);
        await updateConfig(db, configs[dbName])
        console.log(`Config updated to ${dbName}`)
    } catch (err) {
        console.error(`failed to update the config of DB ${dbName}: ${err}`);
    }
}
