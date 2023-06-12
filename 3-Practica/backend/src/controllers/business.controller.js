const BusinessDAO = require("../DAOS/business.dao");

const ServiceBusiness = new BusinessDAO();
module.exports = {
  getAllbusiness: async (req, res) => {
    try {
      let business = await ServiceBusiness.getBusiness();
      res.jon({ message: "get all users" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getBusinessById: async (req, res) => {
    try {
      const businessId = req.params.businessId;
      const business = await ServiceBusiness.getBusinessById(businessId);
      res.jon({ data: business });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createBusinnes: async (req, res) => {
    try {
      const { name, products } = req.body;

      const newBusinnes = {
        name,
        products,
      };
      const result = await ServiceBusiness.saveBusinnes(newBusinnes);

      res.jon({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addBusinessProduct: async (req, res) => {
    try {
      const newProduct = req.body;
      const businessId = req.params.businessId;

      const business = await ServiceBusiness.getBusinnesById(businessId);
      business.products.push(newProduct);

      const result = await business.save();
      res.json({ message: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
