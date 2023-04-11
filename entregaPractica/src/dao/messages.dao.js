const Carts = require('./models/carts.model')

class CartsDao{
    async findAll(){
      try {
        return await Carts.find()
      } catch (error) {
        return error
      }  
    }


    async insertMany(newCartInfo){
        try {
            return await Carts.insertMany(newCartInfo)
        } catch (error) {
            return error
        }
    }

    async create(newCartInfo){
        try {
            return await Carts.create(newCartInfo)
        } catch (error) {
            return error
        }
    }

}

module.exports = CartsDao