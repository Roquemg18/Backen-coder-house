const cartsController = require("../carts/controller.carts");
const productsController = require("../products/controller.products");
const messagesController = require("../messages/controller.messages");
const authController = require("../auth/controller.auth");
const usersController = require("../users/controller.users");
const viewsTemplateController = require("../viewsTemplate/controller.viewsTemplate");

const router = (app) => {
  app.use("/carts", cartsController);
  app.use("/products", productsController);
  app.use("/messages", messagesController);
  app.use("/", viewsTemplateController);
  app.use("/users", usersController);
  app.use("/auth", authController);
};

module.exports = router;
