const Order = require("../Models/order.model");

class OrderDAO {
  getOder = async () => {
    try {
      let orders = await Oder.find();
      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getOderById = async (id) => {
    try {
      let order = await Oder.findById(id);
      if (!order) throw new Error("no order found");
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  saveOder = async (newOrder) => {
    try {
      let order = await Order.create(newOrder);
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateOrder = async (orderId, newOrder) => {
    try {
      const result = await Order.updateOne({ id: orderId }, newOrder);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = OrderDAO;
