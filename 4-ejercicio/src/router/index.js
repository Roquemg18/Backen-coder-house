const usersController = require('../users/controller.users')
const productsController = require('../product/products.router')
const realTimeProductsController = require('../realtimeproducts/realTimeProducts.router')


const router = app =>{
    app.use('/users',usersController)
    app.use('/products',productsController)
    app.use('/realtimeproducts',realTimeProductsController)
}

module.exports = router