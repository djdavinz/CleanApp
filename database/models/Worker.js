const mongoose = require('mongoose')
    // const MongoClient = require('mongodb').MongoClient;

/// Users, Posts, Products

const WorkerSchema = new mongoose.Schema({

    workerid: {
        type: 'String',
        required: true,
        unique: true
    },
    firstname: {
        type: 'String',
        required: true
    },
    lastname: {
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

const Worker = mongoose.model('Worker', WorkerSchema)

module.exports = Worker