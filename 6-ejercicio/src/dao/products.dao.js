const Products = require('./models/products.model')

class ProductsDao{
    async findAll(){
      try {
        return await Products.find()
      } catch (error) {
        return error
      }  
    }


    async insertMany(newProductInfo){
        try {
            return await Products.insertMany(newProductInfo)
        } catch (error) {
            return error
        }
    }

    async create(newProductInfo){
        try {
            return await Products.create(newProductInfo)
        } catch (error) {
            return error
        }
    }

    async update(newProductInfo,pid){
        try {
              const updated = await Products.findByIdAndUpdate(pid, newProductInfo, { new: true });
              return updated;
        } catch (error) {
            return error
        }
    }

    async delete(pid){
        try {
            await Products.findByIdAndDelete(pid)
            return "delete"
        } catch (error) {
            return error
        }
    }

}

module.exports = ProductsDao