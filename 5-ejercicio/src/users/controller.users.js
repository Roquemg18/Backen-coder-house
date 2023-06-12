const { Router } = require("express");
const Users = require("../dao/models/users.model");
const { hashPassword } = require("../utils/cryptPassword.util");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const newUserInfo = {
      first_name,
      last_name,
      email,
      age,
      password,
    };

    /* if (
      newUserInfo.email === "adminCoder@coder.com" &&
      newUserInfo.password === "adminCod3r123"
    ) {
      newUserInfo.role = "admin"; // Agregar la propiedad 'role' al objeto
      const user = await Users.create(newUserInfo);
      res
        .status(201)
        .json({ status: "success", message: "Usuario creado", data: user });
    } else { */
    const user = await Users.create(newUserInfo);
    res
      .status(201)
      .json({ status: "success", message: "Usuario creado", data: user });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ status: "error", error: "error interno" });
  }
});

module.exports = router;
