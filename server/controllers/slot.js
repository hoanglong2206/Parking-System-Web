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

exports.getSlotsByArea = async (req, res) => {
  try {
    if (!req.params.areaId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new Error("Area not found!");
    }

    const slots = await Slot.find({ area: req.params.areaId });

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

exports.getSlotById = async (req, res) => {
  try {
    let slot;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      slot = await Slot.findById(req.params.id);
    }

    if (!slot) {
      throw new Error("Slot not found!");
    }

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
