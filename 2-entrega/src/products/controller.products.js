const {Router} = require('express');
const FilesDao = require('../dao/files.dao');
const ProductsDao  = require('../dao/products.dao');
const uploader = require('../utils/multer.utils');

const ProductsFile = new FilesDao('products.json') 
const Products = new ProductsDao()
const router = Router();



/* router.get('/',async(req, res)=>{
    try {
        const products = await Products.findAll()
        res.json({message:products})
    } catch (error) {
        res.status(400).json({error})
    }
}) */

router.get('/',async(req, res)=>{
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort } : null,
            populate: 'category'
        };

        const queryFilter = query ? { category: query } : {};

        const products = await Product.paginate(queryFilter, options);
        
        const response = {
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: products.hasPrevPage ? `/products?page=${products.prevPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
            nextLink: products.hasNextPage ? `/products?page=${products.nextPage}&limit=${limit}&sort=${sort}&query=${query}` : null,
        };

        res.json(response);

    } catch (error) {
        res.status(400).json({error})
    }
})

router.get('/loadData',async (req, res) => {
    try {
        const products = await ProductsFile.getItems()
        const newProduct = await Products.insertMany(products)
        res.json({status:'success', message:newProduct})
    } catch (error) {
       res.status(400).json({status: 'error',  error}) 
    }
})


router.post('/',uploader.single('file'), async(req, res)=>{
    try {
        const {title,description,code,price,stock,category} = req.body
        const newProductInfo = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail:req.file.filename
            
        }
        const newProduct = await Products.create(newProductInfo)
        res.json({status:'success',message:newProduct})

    } catch (error) {
        if(error.code === 11000){
           return res.status(400).json({error: 'Esta cuenta ya existe'})
        }

        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
});

router.put('/:pid',async (req,res)=>{
    try {
        const pid = req.params.pid
        const {title,description,code,price,stock,category,thumbnail} = req.body
        const newProductInfo = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnail,  
        }
        
        const newProduct = await Products.update(newProductInfo,pid)
        Products.create(newProduct)
        res.json({ message: newProduct });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
    }

})

router.delete('/:pid' ,async (req,res)=>{
    try {
        const pid = req.params.pid
        await Products.delete(pid)
        res.json({ message: "Product delete" });
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'internal server error'})
    }
    
})



module.exports = router