const Notification = require("../models/notification");

exports.getNotifications = async (_req, res) => {
  try {
    const notifications = await Notification.find();

    res.status(200).json({
      status: "success",
      results: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getNotification = async (req, res) => {
  try {
    let notification;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      notification = await Notification.findById(req.params.id);
    }

    if (!notification) {
      throw new Error("Notification not found!");
    }

    res.status(200).json({
      status: "success",
      notification,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    let notification;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      notification = await Notification.findById(req.params.id);
    }

    if (!notification) {
      throw new Error("Notification not found!");
    }

    notification.status = "read";

    await notification.save();

    res.status(200).json({
      status: "success",
      notification,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    let notification;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      notification = await Notification.findById(req.params.id);
    }

    if (!notification) {
      throw new Error("Notification not found!");
    }

    await notification.remove();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
