const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    // userId: {
    //     type : String,
        
    // },
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
    email:{
        type: String,
        required: true
    },
    password: {
        type : String,
    }
})

module.exports = mongoose.model('Person', personSchema)