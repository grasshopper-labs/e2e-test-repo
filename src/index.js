const { mongooseClient } = require('./db')
const {updateConfigForDB} = require("./controllers/configCtrl");
require('dotenv').config()


async function main() {
    const connection = await mongooseClient(process.env.MONGODB_URI);

    await updateConfigForDB(connection, "e2e-drl");
}

main()
