const { Router } = require("express");

const { getAllOrders, getOrder, saveOrder } = require("../ordercontroller");
const router = Router();

router.get("/", getAllOrders, saveOrder);
router.get("/:userId", getOrder, saveOrder);
router.post("/", saveOrder);

module.exports = router;
