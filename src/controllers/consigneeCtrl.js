const {retailersIdentifierToRemain} = require("../common");


const deleteConsigneesInDb = async (db) => {
    const query = {
        first_name: {
            $nin: retailersIdentifierToRemain
        }
    }
    await db.collection("consignee").deleteMany(query)
}

exports.deleteConsignees = async (db, dbName) => {
    try {
        await deleteConsigneesInDb(db)
        console.log(`Deleted consignees successfully in ${dbName}.`)
    } catch (err) {
        console.log(`failed to delete consignees, error: ${err}`)
    }
}
