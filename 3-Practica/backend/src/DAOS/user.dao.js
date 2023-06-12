const Users = require("../Models/user.model");

class UserDAO {
  getUsers = async () => {
    try {
      let users = await Users.find();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getUserById = async (id) => {
    try {
      let user = await Users.findById(id);
      if (!user) throw new Error("no user found");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  saveUser = async (newUser) => {
    try {
      let user = await Users.create(newUser);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  updateUser = async (userId, newUser) => {
    try {
      const result = await Users.updateOne({ id: userId }, newUser);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = UserDAO;
