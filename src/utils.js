require('dotenv').config()


const fieldsWithUrls = ["company.public_root", "PUBLIC_ROOT", "globalSync.url"]
exports.appIds = ["qa", "qa-partner1", "qa-partner2"]


const getUrlByDbName = (dbName) => {
    const envVarName = `${dbName.toUpperCase().replace('-','_')}_URL`
    return process.env[envVarName]
}

const setUrlForKey = (confObj, key, defaultUrl) => {
    switch (key) {
        case 'globalSync.url':
            // If the key is "globalSync.url" then we always should put the drl url because it's the master of the envs.
            return process.env.E2E_DRL_URL
        case 'globalSync.rabbitmq.connection_url':
            // If this is the key, need to check if it's the master
            return (confObj["globalSync.is_master"] === true) ? process.env.RABBITMQ_URL : null
        default:
            return defaultUrl
    }
}

exports.updateUrls = (confObject, dbName) => {
    const defaultUrl = getUrlByDbName(dbName)
    Object.keys(confObject).forEach(key => {
        if (fieldsWithUrls.includes(key)) {
            const url = setUrlForKey(confObject, key, defaultUrl)
            if (url === null) {
                throw new Error(`URL is null, please check for issues`)
            }
            confObject[key] = url;
        }
    })
}

exports.updateRabbitExchangeData = (confObj) => {
    if (confObj["globalSync.is_master"] === true) {
        confObj["globalSync.rabbitmq.exchange_name"] = process.env.RABBITMQ_EXCHANGE
        confObj["globalSync.rabbitmq.master_queue"] = process.env.RABBITMQ_MASTER_QUEUE
        return
    }
    console.log("If you see this log then this conf file is for no rabbit master")
}

exports.mapAppIds = (appId) => {
    switch (appId) {
        case 'qa':
            return 'e2e-drl'
        case 'qa-partner1':
            return 'e2e-p1'
        case 'qa-partner2':
            return 'e2e-p2'
        default:
            throw new Error(`App id ${appId} not found`)
    }
};

exports.getUrlByAppId = (appId) => {
    if (appId.toString().toLowerCase() === 'qa') { return process.env.E2E_DRL_URL }
    else if (appId.includes('1')) { return process.env.E2E_P1_URL }
    else if (appId.includes('2')) { return process.env.E2E_P2_URL }
    else { throw new Error(`invalid appId ${appId}`) }
};