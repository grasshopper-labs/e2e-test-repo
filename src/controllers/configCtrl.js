const configs = require('../data/configs.json');
const {changeDb } = require("../db");
const {updateUrls, updateRabbitExchangeData} = require("../utils");

exports.getConfig = async (db) => {
    return await db.collection('config').findOne({})
}

const updateConfig = async (db, updatedFields) => {
    await db.collection('config').findOneAndUpdate({}, { $set:updatedFields })
    console.log(`config successfully updated`)
}

const updateConfigFields = (dbName) => {
    const config = configs[dbName]
    updateUrls(config, dbName)
    updateRabbitExchangeData(config)
    return config
}

exports.updateConfigForDB = async (conn, dbName) => {
    try {
        const db = await changeDb(conn, dbName);
        const newConfig = updateConfigFields(dbName)
        await updateConfig(db, newConfig)
        console.log(`Config updated to ${dbName}`)
    } catch (err) {
        console.error(`failed to update the config of DB ${dbName}: ${err}`);
    }
}
