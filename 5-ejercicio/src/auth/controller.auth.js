const { Router } = require("express");
const Users = require("../dao/models/users.model");

const router = Router();
router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/login");
  });
});

router.post("/", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const user = await Users.findOne({ email });
    console.log(user);
    if (!user)
      return res.status(400).json({
        status: "error",
        error: "El usuario y la contraseña no coincide",
      });

    if (user.password !== password)
      return res.status(400).json({
        status: "error",
        error: "El usuario y la contraseña no coincide",
      });
    if (email === "adminCoder@coder.com" && password === "adminCod3r123,") {
      await user.updateOne({
        email: "adminCoder123@coder.com",
      });
    }
    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    };
    console.log(user);

    //res.json({ status: "success", message: "Sesión iniciada" });
    res.redirect("/products");
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
  }
});

module.exports = router;
