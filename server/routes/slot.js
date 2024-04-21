const express = require("express");
const slotController = require("../controllers/slot");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", slotController.getSlots);
router.get("/:id", slotController.getSlot);

router.use(authController.protect);

module.exports = router;
