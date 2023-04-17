const Carts = require('./models/carts.model')
const Products  = require('./models/products.model')
class CartsDao {

    async findAll() {
        try {
            return await Carts.find()
        } catch (error) {
            return error
        }
    }

    async findId(cid) {
        try {
            return await Carts.findById(cid).populate()
        } catch (error) {
            return error
        }
    }



    async create(cart) {
        try {
            return await Carts.create(cart)
        } catch (error) {
            return error
        }
    }

    
    
    async update (cid,products){
        try {
            Carts.findByIdAndUpdate(cid, { products }, { new: true })
    .populate('products.product')
    .exec((err, cart) => {
      if (err) {
        return res.status(500).json({ status: 'error', payload: err });
      }
      if (!cart) {
        return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado' });
      }
      const limit = parseInt(req.query.limit) || 10;
      const page = parseInt(req.query.page) || 1;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = cart.products.length;
      const totalPages = Math.ceil(total / limit);
      const hasPrevPage = page > 1;
      const hasNextPage = page < totalPages;
      const prevPage = hasPrevPage ? page - 1 : null;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevLink = hasPrevPage ? `/api/carts/${cid}?limit=${limit}&page=${prevPage}` : null;
      const nextLink = hasNextPage ? `/api/carts/${cid}?limit=${limit}&page=${nextPage}` : null;
      const result = cart.products.slice(startIndex, endIndex);
      return res.json({
        status: 'success',
        payload: result,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink
      });
    });
        } catch (error) {
            return error
        }
    }


    async updateQuantity(cid, pid, quantity) {
        try {
            const cart = await Carts.findById(cid);
            const productIndex = cart.products.findIndex(p => p.product._id == pid);
            if (productIndex === -1) {
                res.status(404).json({ status: "error", payload: "Producto no encontrado en el carrito." });
                return;
            }
            cart.products[productIndex].quantity = quantity;
            await cart.save();
        } catch (error) {
            return error
        }
    }

    async delete(pid, cid) {
        try {
            const cart = await Carts.findById(cid);
            const productIndex = cart.products.findIndex(p => p.product._id == pid);
            if (productIndex === -1) {
                res.status(404).json({ status: "error", payload: "Producto no encontrado en el carrito." });
                return;
            }
            cart.products.splice(productIndex, 1);
            await cart.save();
        } catch (error) {
            return error
        }
    }

}

module.exports = CartsDao