const { mongooseClient, changeDb} = require('./db')
const {updateConfigForDB} = require("./controllers/configCtrl");
const {updatePartners} = require("./controllers/partnerCtrl");
const {deleteRetailers} = require("./controllers/retailerCtrl");
const {deleteConsignees} = require("./controllers/consigneeCtrl");
require('dotenv').config()


async function updateDB(connection, dbName) {
    const db = await changeDb(connection, dbName);
    await updateConfigForDB(db, dbName);
    await updatePartners(db, dbName);
    await deleteRetailers(db, dbName);
    await deleteConsignees(db, dbName);
}

async function main() {
    const connection = await mongooseClient(process.env.MONGODB_URI);

    await updateDB(connection, 'e2e-drl');
}

main()