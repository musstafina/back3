const mongoose = require('mongoose');

const Loginschema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: null
    },
    deletionDate: {
        type: Date,
        default: null
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const collection = mongoose.model("users", Loginschema);

module.exports = collection;