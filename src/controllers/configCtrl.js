const configs = require('../data/configs.json');
const {changeDb, checkIfDbExists} = require("../db");

exports.getConfig = async (db) => {
    return await db.collection('config').findOne({})
}

const updateConfig = async (db, updatedFields) => {
    await db.collection('config').findOneAndUpdate({}, { $set:updatedFields })
    console.log(`config successfully updated`)
}

exports.updateConfigForDB = async (conn, dbName) => {
    try {
        const db = await changeDb(conn, dbName);
        await updateConfig(db, configs[dbName])
        console.log(`Config updated to ${dbName}`)
    } catch (err) {
        console.error(`failed to update the config of DB ${dbName}: ${err}`);
    }
}
