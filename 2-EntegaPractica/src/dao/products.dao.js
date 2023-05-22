const Products = require("./models/products.model");

class ProductsDao {
  async findAll() {
    try {
      return await Products.find();
    } catch (error) {
      throw error;
    }
  }

  async insertMany(newProductInfo) {
    try {
      return await Products.insertMany(newProductInfo);
    } catch (error) {
      throw error;
    }
  }

  async create(newProductInfo) {
    try {
      return await Products.create(newProductInfo);
    } catch (error) {
      throw error;
    }
  }

  async update(newProductInfo, pid) {
    try {
      const updated = await Products.findByIdAndUpdate(pid, newProductInfo, {
        new: true,
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async delete(pid) {
    try {
      await Products.findByIdAndDelete(pid);
      return "delete";
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsDao;
