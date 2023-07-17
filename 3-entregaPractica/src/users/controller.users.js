const { Router } = require("express");
const passport = require("passport");
const EntityDAO = require("../dao/entity.dao");

const Users = new EntityDAO("users");
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

router.put("/:uid", async (req, res) => {
  try {
    const id = req.params.uid;
    const info = new UserDTO(req.body);
    const newUser = await Users.update(info, id);
    res.json({ message: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/:uid", async (req, res) => {
  try {
    const id = req.params.uid;
    await Users.delete(id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/premium/:uid", async (req, res) => {
  try {
    const userId = req.params.uid;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.role = user.role === "user" ? "premium" : "user";
    await user.save();

    res.json({ message: "User role updated", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
