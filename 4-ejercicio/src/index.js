const express = require('express')
const handlebars = require('express-handlebars')
const {Server}= require('socket.io')
const router = require('./router')

const port = 3000
const app = express()
let products = require('./files/productos.json')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));


app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')
app.set('view engine','handlebars')

router(app)

const httpServer = app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
const io = new Server(httpServer)

io.on('connection', socket =>{

    socket.emit("updateProducts", products);

    socket.on("newProduct", (product) => {
    products.push(product);
    
    io.emit("updateProducts", products);
    });

    socket.on("deleteProduct", (product) => {
    
    products = products.filter((p) => p.id !== product.id);
    
    io.emit("updateProducts", products);
    });
})