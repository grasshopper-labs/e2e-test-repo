const mongoose = require("mongoose");


exports.mongooseClient = async (uri, options ={}) => {
    try {
        mongoose.set('strictQuery', false);

        const conn = await mongoose.createConnection(uri, options);
        console.log("MongoDB connection succeeded!")
        return conn
    } catch (error) {
        console.error("MongoDB primary connection failed, " + error);
        throw new Error("MongoDB connection failed!");
    }
}

checkIfDbExists = async (conn, dbName) => {
    const dbs = await conn.listDatabases().then((dbs) => {
        return dbs['databases'].map((db) => db.name) }
    );
    return (dbs.includes(dbName))
}


exports.changeDb = async (connection, dbName) => {
    try {
        if (await checkIfDbExists(connection, dbName)) {
            const db = connection.useDb(dbName)
            console.log(`DB changed to ${dbName}`)
            return db
        } else {
            throw new Error(`DB with the name: ${dbName} not found!`)
        }
    } catch (err) {
        console.error('failed to change DB: ', err);
    }
}
