const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema(
  {
    plate: {
      type: String,
      required: true,
    },
    imageIn: {
      type: String,
    },
    imageOut: {
      type: String,
    },
    checkIn: {
      type: Date,
    },
    checkOut: {
      type: Date,
    },
    slot: {
      type: mongoose.Schema.ObjectId,
      ref: "Slot",
    },
    totalPayment: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["parking", "completed"],
      default: "parking",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

parkingSchema.pre(/^find/, function (next) {
  this.populate("slot");
  next();
});

const Parking = mongoose.model("Parking", parkingSchema);

module.exports = Parking;
