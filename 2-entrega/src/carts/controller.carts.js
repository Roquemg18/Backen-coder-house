const {Router} = require('express');
//const Carts = require('../dao/models/carts.model');

const CartsDao = require('../dao/carts.dao')


const router = Router();
const Carts = new CartsDao()


router.get('/',async(req, res)=>{
    try {
        const carts = await Carts.findAll()
        res.json({message:carts})
    } catch (error) {
        res.status(400).json({error})
    }
})

router.get('/:cid',async(req, res)=>{
    try {
    const cid = req.params.cid
    const cart = await Carts.findId(cid)
    res.render("cart.handlebars",{cart})
    } catch (error) {
        res.status(400).json({error})
    }
})



router.post('/', async(req, res)=>{
    try {
        const cart = [
            products=[],
            quantity = 0
        ]
        
        await Carts.create(cart)

        res.json({status:'success',message:"carrito creado"})

    } catch (error) {
        if(error.code === 11000){
           return res.status(400).json({error: 'Esta cuenta ya existe'})
        }

        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
});


router.put('/api/carts/:cid',async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = req.body.products;
    
    const productUpdate = await Carts.update(cid,products)
    console.log(productUpdate)
  } catch (error) {
    res.status(500).json({ status: "error", payload: error.message });
  }
  
});


router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const newCart = await Carts.updateQuantity(cid,pid,quantity)

    res.json({ status: "success", payload: newCart.products[productIndex] });
  } catch (error) {
    res.status(500).json({ status: "error", payload: error.message });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
     
      await Carts.delete(cid,pid)
      res.json({ status: "success", payload: "Producto eliminado del carrito." });
    } catch (error) {
      res.status(500).json({ status: "error", error });
    }
  });

  router.delete('/:cid', async (req, res) => {
    try {
      const cid = req.params.cid;
      await Carts.findByIdAndDelete(cid);
      res.json({ status: "success", payload: "Carrito eliminado." });
    } catch (error) {
      res.status(500).json({ status: "error", payload: error.message });
    }
  });



module.exports = router