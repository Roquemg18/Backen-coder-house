const Products = require('./models/products.model')

class ProductsDao{
    async findAll(){
      try {
        return await Products.find()
      } catch (error) {
        return error
      }  
    }


    async insertMany(newCartInfo){
        try {
            return await Products.insertMany(newCartInfo)
        } catch (error) {
            return error
        }
    }

    async create(newCartInfo){
        try {
            return await Products.create(newCartInfo)
        } catch (error) {
            return error
        }
    }

}

module.exports = ProductsDao