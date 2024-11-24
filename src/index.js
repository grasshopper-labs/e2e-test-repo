const { mongooseClient, changeDb} = require('./db')
const {updateConfigForDB} = require("./controllers/configCtrl");
const {updatePartners} = require("./controllers/partnerCtrl");
const {deleteRetailers} = require("./controllers/retailerCtrl");
const {deleteConsignees} = require("./controllers/consigneeCtrl");
const {deleteDeliveriesQuestionnaires, deleteDimensionalizers, deleteInventory, deleteManifests, deleteOrders} = require("./controllers/collectionCleanerCtrl");
require('dotenv').config()


async function updateDB(connection, dbName) {
    const db = await changeDb(connection, dbName);
    console.log(`Starting process for ${dbName}`);
    await updateConfigForDB(db, dbName);
    await updatePartners(db, dbName);
    await deleteRetailers(db, dbName);
    await deleteConsignees(db, dbName);
    await deleteDeliveriesQuestionnaires(db, dbName);
    await deleteDimensionalizers(db, dbName);
    await deleteInventory(db, dbName);
    await deleteManifests(db, dbName);
    await deleteOrders(db, dbName);
    console.log(`Finished process successfully for ${dbName}`);
}

async function main() {
    const connection = await mongooseClient(process.env.MONGODB_URI);

    await updateDB(connection, 'e2e-drl');
}

main()