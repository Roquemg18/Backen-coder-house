const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

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

collectionSchema.plugins(mongoosePaginate)
const Products = mongoose.model(collectionName,collectionSchema)

module.exports = Products