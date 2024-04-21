const Slot = require("../models/slot");

exports.getSlots = async (_req, res) => {
  try {
    const slots = await Slot.find();

    res.status(200).json({
      status: "success",
      results: slots.length,
      data: {
        slots,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        slot,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
