const {Router} = require('express');

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
      const cid = req.params.cid;
      const products = await Carts.findId(cid);
      res.json({message:products})
      //res.render("cart.handlebars",{products})
    } catch (error) {
        res.status(400).json({error})
    }
})



router.post('/', async(req, res)=>{
    try {
        const cart = [
            product=[],
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


router.put('/:cid',async (req, res) => {
  try {
    const cid = req.params.cid; 
    const products = req.body
    console.log("llega esto:",products);

    const cart = await Carts.update(products,cid)
    console.log(cart);
    res.json(cart);
  } catch (error) {
    res.status(400).json({error})
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
     
      await Carts.deleteProduct(cid,pid)
      res.json({ status: "success", payload: "Producto eliminado del carrito." });
    } catch (error) {
      res.status(500).json({ status: "error", error });
    }
  });

  router.delete('/:cid', async (req, res) => {
    try {
      const cid = req.params.cid;
      await Carts.delete(cid);
      res.json({ status: "success", payload: "Carrito eliminado." });
    } catch (error) {
      res.status(500).json({ status: "error", payload: error.message });
    }
  });



module.exports = router