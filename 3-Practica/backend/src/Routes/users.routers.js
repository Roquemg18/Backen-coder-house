const { Router } = require("express");

const { getAllUsers, getUser, saveUser } = require("../controllers/users.controller");
const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUser);
router.post("/", saveUser);

module.exports = router;
