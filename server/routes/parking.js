const express = require("express");
const parkingController = require("../controllers/parking");

const router = express.Router();

router.post(
  "/createParking",
  parkingController.uploadImageParking,
  parkingController.getImageParking,
  parkingController.createParking
);
router.patch(
  "/updateParkingCheckOut",
  parkingController.uploadImageParking,
  parkingController.getImageParking,
  parkingController.updateParkingCheckOut
);

router.patch("/updateParkingSlot", parkingController.updateParkingSlot);
router.get("/", parkingController.getParkings);
router.get("/:id", parkingController.getParking);

module.exports = router;
