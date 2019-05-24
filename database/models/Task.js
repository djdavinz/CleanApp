const mongoose = require('mongoose')
    // const MongoClient = require('mongodb').MongoClient;

/// Users, Posts, Products

const TaskSchema = new mongoose.Schema({

    companyname: {
        type: 'String',
        required: true
    },
    siteid: {
        type: 'String',
        required: true
    },
    siteaddress: {
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

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task