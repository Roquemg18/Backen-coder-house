const {Router}= require('express');

const router = Router();

const carritos = []
let nextId = 1
function generateId(){
        id = nextId;
        nextId++;
        return id
}


router.post('/',(req,res)=>{
    const newCarrito = {
    id : generateId(),
    products :  []
    }

    carritos.push(newCarrito)
    res.status(201).json(newCarrito)
})

router.get('/:cid',(req,res)=>{
    const cid = parseInt(req.params.cid)
    const carrito = carritos.filter(carrito => carrito.id === cid)
    res.status(200).json(carrito)
})


router.post('/:cid/product/:pid', (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    const carrito = carritos.find(carrito => carrito.id === cid);
    if (!carrito) {
        res.status(404).json({ error: 'Carrito no encontrado' });
        return;
    }
    const repeated = carrito.products.findIndex(p => p.product === pid); 

    if (repeated === -1) { 
        const product = {
        product: pid,
        quantity: 1
    };
    carrito.products.push(product);
    res.status(201).json(product);
    } else { 
        carrito.products[repeated].quantity++;
        res.status(200).json(carrito.products[repeated]);
    }
})


module.exports = router