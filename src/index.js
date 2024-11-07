const { mongooseClient } = require('./db')
const {updateConfigForDB} = require("./controllers/configCtrl");
const {updatePartners} = require("./controllers/partnerCtrl");
require('dotenv').config()


async function main() {
    const connection = await mongooseClient(process.env.MONGODB_URI);

    await updateConfigForDB(connection, 'e2e-drl');
    await updatePartners(connection, 'e2e-drl')
}

main()