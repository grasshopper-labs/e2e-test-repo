const {getDb} = require("../db");


exports.getConfig = async () => {
    const db = getDb()
    return await db.collection('config').findOne({})
}

exports.updateConfig = async (db, updatedFields) => {
    const results = await db.collection('config').updateOne({}, { $set:updatedFields })
    console.log(`results: ${JSON.stringify(results)}`)
}

