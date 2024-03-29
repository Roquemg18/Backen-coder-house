const {Router} = require('express');
//const Carts = require('../dao/models/carts.model');
const FilesDao = require('../dao/files.dao')
const CartsDao = require('../dao/carts.dao')

const CartsFile = new FilesDao('Users.json') 
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

router.get('/loadData',async (req, res) => {
    try {
        const carts = await CartsFile.getItems()
        const newCarts = await Carts.insertMany(carts)
        res.json({status:'success', message:newCarts})

    } catch (error) {
       res.status(400).json({status: 'error',  error}) 
    }
})


router.post('/', async(req, res)=>{
    try {
        const {first_name, last_name,email} = req.body
        const newCartInfo = {
            first_name,
            last_name,
            email
        }
        const newCart = await Users.create(newCartInfo)
        res.json({status:'success',message:newCart})

    } catch (error) {
        if(error.code === 11000){
           return res.status(400).json({error: 'Esta cuenta ya existe'})
        }

        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
});



module.exports = router