const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    userId: {
        type : String,
        required: true
    },
    firstName: {
        type : String,
        required: true
    },
    lastName: {
        type : String,
        required: true
    },
    dateOfBirth: {
        type : Date,
        required: true
    },
    gender: {
        type : String,
        required: true
    },
    password: {
        type : String,
        required: true
    }
})

module.exports = mongoose.model('Person', personSchema)