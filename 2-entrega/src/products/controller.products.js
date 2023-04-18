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
    try {
      let limit = req.query.limit || 10;
      let page = req.query.page || 1;
      let sort = req.query.sort || '';
      let query = req.query.query || '';
      let category = req.query.category || '';
      let availability = req.query.availability || '';
  
      let filters = {};
  
      if (query !== '') {
        filters = { name: { $regex: query, $options: 'i' } };
      }
  
      if (category !== '') {
        filters = { ...filters, category: category };
      }
  
      if (availability !== '') {
        filters = { ...filters, available: availability };
      }
  
      let sortOrder = {};
      if (sort !== '') {
        sortOrder = { price: sort === 'asc' ? 1 : -1 };
      }
  
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sortOrder,
      };
      
      const products = await Product.paginate(filters, options);
      
      const infoProductos = products.docs
      
      const totalPages = products.totalPages;
      const prevPage = products.prevPage;
      const nextPage = products.nextPage;
      const currentPage = products.page;
      const hasPrevPage = products.hasPrevPage;
      const hasNextPage = products.hasNextPage;
      const prevLink = hasPrevPage ? `http://${req.headers.host}${req.baseUrl}?page=${prevPage}&limit=${limit}` : null;
      const nextLink = hasNextPage ? `http://${req.headers.host}${req.baseUrl}?page=${nextPage}&limit=${limit}` : null;
      
      const infoProducts = {
        status: 'success',
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: currentPage,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink,
        products: products.docs}

      res.render("products.handlebars",{infoProductos})
      
    } catch (error) {
      return res.status(400).render("error.handlebars", { error: error.message });
    }
  });

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