const usersController = require('../carts/controller.carts')
const productsController = require('../products/controller.products')
const messagesController = require('../messages/controller.messages')



const router = app =>{
    app.use('/carts',usersController)
    app.use('/products',productsController)
    app.use('/messages',messagesController)
}

module.exports = router