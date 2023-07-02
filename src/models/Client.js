const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        trime: true
    },
    lastname: {
        type: String,
        trime: true
    },
    company: {
        type: String,
        trime: true
    },
    email : {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
})


module.exports = mongoose.model('Client', clientSchema)
