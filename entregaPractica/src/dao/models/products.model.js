const mongoose = require('mongoose')

const collectionName = 'product'

const collectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price : Number,
  stock: Number,
  category: String,
  thumbnail: String
})

const Products = mongoose.model(collectionName,collectionSchema)

module.exports = Products