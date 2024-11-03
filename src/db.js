const { MongoClient } = require('mongodb');

let db = null;

async function initDb(dbName) {
    if (db) {
        console.log('MongoDB connection already initialized');
        return db;
    }

    try {
        const mongoClient = await MongoClient.connect(process.env.MONGODB_URI);
        db = mongoClient.db(dbName);
        console.log('Connected to MongoDB successfully.');
        return db
    } catch (error) {
        console.error(error);
    }
}

function getDb() {
    if (!db) {
        throw new Error('DB connection is not initialized!');
    }
    return db;
}

module.exports = { initDb, getDb };
