const express = require('express')

const productsRouter = require('./routes/products.router')
const cartsRouter = require('./routes/carts.router')


const port = 3000
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));
app.use('/api/products',productsRouter )
app.use('/api/carts', cartsRouter)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})