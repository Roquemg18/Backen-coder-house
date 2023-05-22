const Carts = require("./models/carts.model");
class CartsDao {
  async findAll() {
    try {
      return await Carts.find();
    } catch (error) {
      throw error;
    }
  }

  async findId(cid) {
    try {
      const cart = await Carts.findById(cid).populate("carts.product");
      return cart.carts.product;
    } catch (error) {
      throw error;
    }
  }

  async create(cart) {
    try {
      return await Carts.create(cart);
    } catch (error) {
      throw error;
    }
  }

  async update(cid, products) {
    try {
      const cart = await Carts.findById(cid);
      cart.product.push(products);
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  }
  async delete(cid) {
    try {
      await Carts.findByIdAndDelete(cid);
      return "carrito eliminado";
      s;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CartsDao;
