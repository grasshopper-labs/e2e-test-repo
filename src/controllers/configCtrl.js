const configs = require('../data/configs.json');
const {changeDb, checkIfDbExists} = require("../db");

exports.getConfig = async (db) => {
    return await db.collection('config').findOne({})
}

const updateConfig = async (db, updatedFields) => {
    const results = await db.collection('config').findOneAndUpdate({}, { $set:updatedFields })
    console.log(`results: ${JSON.stringify(results)}`)
}

exports.updateConfigForDB = async (conn, dbName) => {
    try {
        if (await checkIfDbExists(conn, dbName)) {
            const db = changeDb(conn, dbName);
            await updateConfig(db, configs[dbName])
            console.log(`Config updated to ${dbName}`)
        } else {
            throw new Error(`DB with the name: ${dbName} does not exists`)
        }
    } catch (err) {
        console.error(`failed to update the config of DB ${dbName}: ${err}`);
    }
}
