const {Router} = require('express');
const FilesDao = require('../dao/files.dao');
const ProductsDao  = require('../dao/products.dao');
const uploader = require('../utils/multer.utils');
const Product = require('../dao/models/products.model')
const paginate = require('mongoose-paginate-v2')

const ProductsFile = new FilesDao('products.json') 
const Products = new ProductsDao()
const router = Router();





router.get('/', async (req, res) => {
     const { limit = 10, page = 1, sort, query, category, availability } = req.query;

  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort && { price: sort === 'asc' ? 1 : -1 },
    customLabels: {
      docs: 'payload',
      totalDocs: 'totalProducts',
      totalPages: 'totalPages'
    }
  };

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (availability) {
    filter.availability = availability;
  }

  if (query) {
    filter.$text = { $search: query };
  }

  try {
    const products = await Product.paginate(filter, options);
    
    const payload = products.payload.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock 
    }));

    const totalPages = products.totalPages;
    const prevPage = products.prevPage || 1;
    const nextPage = products.nextPage || totalPages;
    const currentPage = products.page;
    const hasPrevPage = products.hasPrevPage;
    const hasNextPage = products.hasNextPage;
    const prevLink = hasPrevPage && `/products?page=${prevPage}&limit=${limit}&sort=${sort}&query=${query}&category=${category}&availability=${availability}`;
    const nextLink = hasNextPage && `/products?page=${nextPage}&limit=${limit}&sort=${sort}&query=${query}&category=${category}&availability=${availability}`;

    res.render('products.handlebars',{payload,totalPages,prevPage,nextPage,currentPage,prevLink,nextLink})
    
  } catch (error) {
    next(error);
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
            //thumbnail:req.file.filename
            
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