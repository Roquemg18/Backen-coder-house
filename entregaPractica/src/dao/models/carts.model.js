const mongoose = require('mongoose');

const collectionName = 'carts'

const collectionSchema = new mongoose.Schema({
    first_ame: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    }
})

const Carts = mongoose.model(collectionName, collectionSchema)

module.exports = Carts