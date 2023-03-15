const {Router}= require('express');

const products = []
let nextId = 1

const router = Router();

router.get('/',async (req,res)=>{

    try {
        const { limit } = req.query;
        const limitedProducts = limit
        ? products.slice(0, parseInt(limit))
        : products;
        res.json(limitedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const pid = parseInt(req.params.pid);
        const product = products.find(product => product.id === pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.post('/',  (req, res) => {

    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !price  || !code || !category ||!stock) {
        console.error('Todos los campos del producto son obligatorios');
        return;
        }  

    if (products.some(p => p.code === code)) {
        console.error(`El producto con código ${product.code} ya existe`);
        return;
        }

        id = nextId;
        nextId++;
        
        const nuevoProducto = { id, title, description, code, price, stock, category, thumbnails, status: true };
    products.thumbnail = thumbnails
    products.push(nuevoProducto);
    res.json({message:'producto cargado'})
})


router.put('/:pid', (req,res)=>{
    const pid = parseInt(req.params.pid);
    const product = products.find(product => product.id === pid);
    if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
    }
    product.title = req.body.title;
    product.description = req.body.description;
    product.code = req.body.code;
    product.price = req.body.price;
    product.stock = req.body.stock;
    product.category = req.body.category;
    product.thumbnails = req.body.thumbnails;
    res.json({ message: "Producto actualizado" });
})

router.delete('/:pid' ,(req,res)=>{
    const pid = parseInt(req.params.pid);
    const product = products.find(product => product.id === pid);
    if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
    }
    products.splice(products.indexOf(product), 1);
    res.json({ message: "Producto eliminado" });
})

module.exports = router