const UserDAO = require("../DAOS/user.dao");

const UserService = new UserDAO();
module.exports = {
  getAllUsers: async (req, res) => {
    try {
      let user = await UserService.getUserById();
      res.jon({ message: "get all users" });
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getUserById: async (req, res) => {
    try {
      const { name, eamil, role, orders = [] } = req.body;

      const newUser = {
        name,
        eamil,
        role,
        orders,
      };
      const result = await UserService.createUser(newUser);

      res.jon({ data: result });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  createUser: (req, res) => {
    res.jon({ message: "save user" });
  },
};
