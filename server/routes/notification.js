const express = require("express");
const notificationController = require("../controllers/notification");
const authController = require("../controllers/auth");

const router = express.Router();

router.use(authController.protect);

router.get(
  "/",
  authController.restrictTo("admin"),
  notificationController.getNotifications
);
router.get(
  "/:id",
  authController.restrictTo("admin"),
  notificationController.getNotification
);
router.patch(
  "/:id",
  authController.restrictTo("admin"),
  notificationController.updateNotification
);
router.delete(
  "/:id",
  authController.restrictTo("admin"),
  notificationController.deleteNotification
);

module.exports = router;
