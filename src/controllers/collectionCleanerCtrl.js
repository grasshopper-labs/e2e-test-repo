

const deleteDeliveriesQuestionnairesInDb = async (db) => {
    await db.collection("deliveryquestionnaires").deleteMany()
}

exports.deleteDeliveriesQuestionnaires = async (db, dbName) => {
    try {
        await deleteDeliveriesQuestionnairesInDb(db)
        console.log(`Deleted delivery questionnaires successfully in ${dbName}.`)
    } catch (err) {
        console.log(`failed to delete delivery questionnaires, error: ${err}`)
    }
}

const deleteDimensionalizersInDb = async (db) => {
    await db.collection("dimensionalizers").deleteMany()
}

exports.deleteDimensionalizers = async (db, dbName) => {
    try {
        await deleteDimensionalizersInDb(db)
        console.log(`Deleted dimensionalizers successfully in ${dbName}.`)
    } catch (err) {
        console.log(`failed to delete dimensionalizers, error: ${err}`)
    }
}

const deleteInventoryInDb = async (db) => {
    await db.collection("inventory").deleteMany()
}

const deleteInventoryGroupedInDb = async (db) => {
    await db.collection("inventory_grouped").deleteMany()
}

const deleteInventoryTrackingInDb = async (db) => {
    await db.collection("inventory_tracking").deleteMany()
}

exports.deleteInventory = async (db, dbName) => {
    try {
        await deleteInventoryInDb(db)
        await deleteInventoryGroupedInDb(db)
        await deleteInventoryTrackingInDb(db)
        console.log(`Deleted inventory items successfully in ${dbName}.`)
    } catch (err) {
        console.log(`failed to delete inventory items, error: ${err}`)
    }
}

const deleteManifestsInDb = async (db) => {
    await db.collection("manifests").deleteMany()
}

exports.deleteManifests = async (db, dbName) => {
    try {
        await deleteManifestsInDb(db)
        console.log(`Deleted manifests successfully in ${dbName}.`)
    } catch (err) {
        console.log(`failed to delete manifests, error: ${err}`)
    }
}

const deleteOrdersInDb = async (db) => {
    await db.collection("orders").deleteMany()
}

exports.deleteOrders = async (db, dbName) => {
    try {
        await deleteOrdersInDb(db)
        console.log(`Deleted orders successfully in ${dbName}.`)
    } catch (err) {
        console.log(`failed to delete manifests, error: ${err}`)
    }
}



