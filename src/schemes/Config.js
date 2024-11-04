const mongoose = require("mongoose");
const { Schema } = mongoose;

exports.configSchema = new Schema({
    app_id: String,
    company: {
        name: String,
        display_name: String,
        public_root: String
    },
    COMPANY_NAME: String,
    PUBLIC_ROOT: String
    }, {
    strict: false,
})
