const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unread", "read"],
      default: "unread",
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "Parking",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

notificationSchema.pre(/^find/, function (next) {
  this.populate("sender");
  next();
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
