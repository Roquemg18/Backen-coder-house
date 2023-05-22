const { Router } = require("express");
const Users = require("../dao/models/users.model");
const passport = require("passport");

const router = Router();

router.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/users/failregister" }),
  async (req, res) => {
    try {
      res.status(201).json({ status: "success", message: "Usuario creado" });
    } catch (error) {
      console.log(error.message);

      res.status(500).json({ status: "error", error: "error interno" });
    }
  }
);

router.get("/failregister", (req, res) => {
  console.log("fallo estrategia de registro");
  res.json({ error: "Failed register" });
});

module.exports = router;
