const mongoose = require('mongoose')
    // const MongoClient = require('mongodb').MongoClient;

/// Users, Posts, Products

const ClientSchema = new mongoose.Schema({

    companyname: {
        type: 'String',
        required: true,
    },
    companyaddress: {
        type: 'String',
        required: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdon: {
        type: 'Date',
        default: new Date(),
        required: true,
    },
})

const Client = mongoose.model('Client', ClientSchema)

module.exports = Client