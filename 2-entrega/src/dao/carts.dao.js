const Carts = require("./models/carts.model");
class CartsDao {
  async findAll() {
    try {
      return await Carts.find();
    } catch (error) {
      return error;
    }
  }

  async findId(cid) {
    try {
      const cart = await Carts.findById(cid).populate("carts.product");
      return cart.carts.product;
    } catch (error) {
      return error;
    }
  }

  async create(cart) {
    try {
      return await Carts.create(cart);
    } catch (error) {
      return error;
    }
  }

  async update(cid, newProductsArray) {
    try {
      return await Carts.findByIdAndUpdate(cid, { product: newProductsArray });
    } catch (error) {
      return "error", error;
    }
  }

  async updateQuantity(cid, pid, quantity) {
    try {
      const cart = await Carts.findById(cid);
      const productIndex = cart.products.findIndex((p) => p.product._id == pid);
      if (productIndex === -1) {
        res.status(404).json({
          status: "error",
          payload: "Producto no encontrado en el carrito.",
        });
        return;
      }
      cart.products[productIndex].quantity = quantity;
      await cart.save();
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(pid, cid) {
    try {
      const cart = await Carts.findById(cid);
      const productIndex = cart.products.findIndex((p) => p.product._id == pid);
      if (productIndex === -1) {
        res.status(404).json({
          status: "error",
          payload: "Producto no encontrado en el carrito.",
        });
        return;
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
    } catch (error) {
      return error;
    }
  }
  async delete(cid) {
    try {
      await Carts.findByIdAndDelete(cid);
      return "carrito eliminado";
      s;
    } catch (error) {
      return error;
    }
  }

  async es(id) {
    try {
      return await mongoose.Types.ObjectId(cid);
    } catch (error) {}
  }
}
module.exports = CartsDao;
