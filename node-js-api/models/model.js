const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    fName: {
        required: true,
        type: String
    },
    lName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    imageUrl: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Data', dataSchema)