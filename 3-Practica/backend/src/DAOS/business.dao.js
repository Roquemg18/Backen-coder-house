const Business = require("../Models/business.model");

class BusinnesDAO {
  getBusinnes = async () => {
    try {
      let business = await Business.find();
      return business;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getBusinnesById = async (id) => {
    try {
      let businnes = await Businnes.findById(id);
      if (!businnes) throw new Error("no user found");
      return businnes;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  saveBusinnes = async (newBusinnes) => {
    try {
      let businnes = await Businnes.create(newBusinnes);
      return businnes;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateBusinnes = async (businnesId, newBusinnes) => {
    try {
      const result = await Businnes.updateOne({ id: businnesId }, newBusinnes);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = BusinnesDAO;
