const { Router } = require("express");
const Users = require("../dao/models/users.model");
const { passwordValidate, createHash } = require("../utils/cryptPassword.util");
const passport = require("passport");
const transport = require("../utils/mail.util");
const bcrypt = require("bcrypt");

const router = Router();

const resetLinks = {};

router.post(
  "/",
  passport.authenticate("login", { failureRedirect: "/auth/faillogin" }),
  async (req, res) => {
    try {
      if (!req.user)
        return res
          .status(401)
          .json({ status: "error", error: "user and password do not match" });

      if (
        req.user.email === "adminCoder@coder.com" &&
        req.user.password === "adminCod3r123"
      ) {
        req.session.user = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
          role: "admin",
        };
      } else {
        req.session.user = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          email: req.user.email,
          role: "user",
        };
      }

      res.json({ status: "success", message: "Sesión iniciada" });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user: email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.json({ error });
    res.redirect("/login");
  });
});

router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    // Generar un token de restablecimiento de contraseña
    const resetToken = generateResetToken();

    // Almacenar el enlace de restablecimiento de contraseña y su expiración
    resetLinks[resetToken] = {
      email,
      expiration: Date.now() + 60 * 60 * 1000, // 1 hora de expiración
    };

    const resetLink = `http://localhost:3000/auth/restablecer-contrasena/${resetToken}`;

    // Enviar el correo con el enlace de restablecimiento de contraseña
    await transport.sendMail({
      from: "molinaroque871@gmail.com",
      to: email,
      subject: "Restablecer contraseña",
      html: `
        <h1>Restablecer contraseña</h1>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.json({ message: "Correo enviado para restablecer la contraseña" });
  } catch (error) {
    throw error;
  }
});

// Ruta para restablecer la contraseña
router.get("/restablecer-contrasena/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Verificar si el enlace de restablecimiento de contraseña existe y no ha expirado
    const resetLink = resetLinks[token];
    if (!resetLink || resetLink.expiration < Date.now()) {
      // El enlace ha expirado, redirigir a la página para generar un nuevo correo de restablecimiento
      return res.redirect("/auth/forgotPassword");
    }

    // Renderizar la vista para restablecer la contraseña
    res.render("restablecer-contrasena.handlebars", { token, resetLink });
  } catch (error) {
    throw error;
  }
});

router.post("/restablecer-contrasena/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Verificar si el enlace de restablecimiento de contraseña existe y no ha expirado
    const resetLink = resetLinks[token];
    if (!resetLink || resetLink.expiration < Date.now()) {
      // El enlace ha expirado, redirigir a la página para generar un nuevo correo de restablecimiento
      return res.redirect("/auth/forgotPassword");
    }

    // Obtener el email del usuario y la nueva contraseña
    const email = resetLink.email;

    // Realizar las validaciones necesarias antes de cambiar la contraseña
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Verificar que la nueva contraseña no sea igual a la anterior
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res
        .status(400)
        .json({ error: "No puedes usar la misma contraseña anterior" });
    }

    // Actualizar la contraseña del usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    // Eliminar el enlace de restablecimiento de contraseña
    delete resetLinks[token];

    res.json({ message: "Contraseña restablecida exitosamente" });
  } catch (error) {
    throw error;
  }
});

function generateResetToken() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let token = "";
  for (let i = 0; i < 32; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}
module.exports = router;
