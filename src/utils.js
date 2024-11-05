require('dotenv').config()

const fieldsWithUrls = ["company.public_root", "PUBLIC_ROOT", "globalSync.url"]

const getUrlByDbName = (dbName) => {
    const envVarName = `${dbName.toUpperCase().replace('-','_')}_URL`
    return process.env[envVarName]
}

exports.updateUrls = (confObject, dbName) => {
    const newUrl = getUrlByDbName(dbName)
    Object.keys(confObject).forEach(key => {
        if (fieldsWithUrls.includes(key)) {
            // If the key is "globalSync.url" then we always should put the drl url because it's the master of the envs.
            if (key === "globalSync.url") {
                confObject[key] = process.env.E2E_DRL_URL;
            } else {
                confObject[key] = newUrl;
            }
        }
    })
    return confObject
}