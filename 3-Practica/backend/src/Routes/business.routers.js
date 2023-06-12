const { Router } = require("express");

const {
  getAllbusiness,
  getBusiness,
  saveBusinnes,
} = require("../business.controller");
const router = Router();

router.get("/", getAllbusiness);
router.get("/:userId", getBusiness);
router.post("/", saveBusinnes);

module.exports = router;
