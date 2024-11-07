const {retailersIdentifierToRemain} = require('../common');


const deleteRetailersInDb = async (db) => {
    const query = {
        identifier: {
            $nin: retailersIdentifierToRemain
        }
    }
    await db.collection("retailer").deleteMany(query)
}

exports.deleteRetailers = async (db, dbName) => {
    try {
        await deleteRetailersInDb(db)
        console.log(`Deleted retailers successfully in ${dbName}.`)
    } catch (err) {
        console.log(`failed to delete retailers, error: ${err}`)
    }
}
