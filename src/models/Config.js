require('dotenv').config()

exports.updateConfigModel = () => {
    return {
        "app_id": `e2e-${process.env.ENV_NAME.toLowerCase()}`,
        "company.name": `E2E-${process.env.ENV_NAME}`,
        "company.display_name": `E2E-${process.env.ENV_NAME}`,
    }
}