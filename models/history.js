const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    apiName: String,
    requestData: Object,
    responseData: Object,
    requestDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('history', historySchema);
