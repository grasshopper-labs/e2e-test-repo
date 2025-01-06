const configs = require('../data/configs.json');
const {updateUrls, updateRabbitExchangeData} = require("../utils");


const getConfig = async (db) => {
    return await db.collection('config').findOne({})
}

const updateConfig = async (db, updatedFields) => {
    await db.collection('config').findOneAndUpdate({}, { $set:updatedFields })
    console.log(`config successfully updated`)
}

const updateConfigFields = (dbName) => {
    const config = configs[dbName]
    updateUrls(config, dbName)
    updateRabbitExchangeData(config)
    return config
}

const loadMasterConfig = async () => {
    const url = `https://raw.githubusercontent.com/grasshopper-labs/devops-utils/refs/heads/main/partner_db_provisioner/init_data/master_config.json`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.TOKEN}`,
                'Accept': 'application/vnd.github.v3.raw'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch master config ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.error(`failed to fetch main config ${err}`);
        return err;
    }
}

const findMissingKeysInExistingConfig = async (masterConfig, existingConfig) => {
    const masterConfigKeys = Object.keys(masterConfig);
    const existingConfigKeys = Object.keys(existingConfig);
    const missingKeys = masterConfigKeys.filter(key => !existingConfigKeys.includes(key));
    console.log(`The missing keys in the existing config are: ${missingKeys}`);
    return missingKeys;
}

const updateExistingConfigWithMissingKeys = async (db, missingKeys, masterConfig) => {
    let newFieldsForConfig = {};
    missingKeys.forEach(key => {
        newFieldsForConfig[key] = masterConfig[key];
    });
    await updateConfig(db, newFieldsForConfig);
}

const compareConfigToMaster = async (db) => {
    const masterConfig = await loadMasterConfig();
    const existingConfig = await getConfig(db)

    try {
        const missingKeys = findMissingKeysInExistingConfig(masterConfig, existingConfig)
        await updateExistingConfigWithMissingKeys(db, missingKeys, masterConfig)
    } catch (err) {
        console.error(`failed to update existing config ${err}`);
    }
}

exports.updateConfigForDB = async (db, dbName) => {
    try {
        const newConfig = updateConfigFields(dbName)
        await updateConfig(db, newConfig)
        await compareConfigToMaster(db)
        console.log(`Config updated to ${dbName}`)
    } catch (err) {
        console.error(`failed to update the config of DB ${dbName}: ${err}`);
    }
}