const mongoose = require('mongoose')

const collectionName = 'products'

const collectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price : String,
  stock: Number,
  category: String,
  thumbnail: String
})

const Products = mongoose.model(collectionName,collectionSchema)

module.exports = Products