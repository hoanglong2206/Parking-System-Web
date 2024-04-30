const Parking = require("../models/parking");
const Notification = require("../models/notification");
const Slot = require("../models/slot");
const cloudinary = require("cloudinary").v2;
const { differenceInHours } = require("date-fns");
const multer = require("multer");
require("dotenv").config({
  path: "../.env",
});

const storage = multer.memoryStorage();
const imageFilter = function (req, file, cb) {
  if (
    !file.originalname.match(
      /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|avif|AVIF|webp|WEBP)$/
    )
  ) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

exports.uploadImageParking = upload.any();

exports.getImageParking = async (req, res, next) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  next();
};

exports.getParkings = async (_req, res) => {
  try {
    const parkings = await Parking.find();

    res.status(200).json({
      status: "success",
      results: parkings.length,
      parkings,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getParking = async (req, res) => {
  try {
    let parking;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      parking = await Parking.findById(req.params.id);
    }

    if (!parking) {
      throw new Error("Parking not found!");
    }

    res.status(200).json({
      status: "success",
      parking,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.createParking = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { lp_part1, lp_part2 } = req.body;
    const plate = `${lp_part1}-${lp_part2}`;
    const isParkingExist = await Parking.findOne({ plate });

    if (isParkingExist) {
      throw new Error("Parking already exist!");
    }

    if (req.files) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const { originalname, buffer, fieldname } = file;
          if (fieldname === "log") {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "parking",
                  public_id: originalname.split(".")[0],
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) {
                    console.error(error);
                    reject(error);
                  } else {
                    req.body.image = result.url;
                    resolve(result);
                  }
                }
              )
              .end(buffer);
          }
        });
      });

      await Promise.all(uploadPromises);
    }

    await Parking.create({
      plate,
      imageIn: req.body.image,
      checkIn: new Date(),
    });
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateParkingCheckOut = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const { lp_part1, lp_part2 } = req.body;
    const plate = `${lp_part1}-${lp_part2}`;
    const parking = await Parking.findOne({ plate });

    if (!parking) {
      throw new Error("Parking not found!");
    }

    if (req.files) {
      const uploadPromises = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const { originalname, buffer, fieldname } = file;
          if (fieldname === "log") {
            cloudinary.uploader
              .upload_stream(
                {
                  folder: "parking",
                  public_id: originalname.split(".")[0],
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) {
                    console.error(error);
                    reject(error);
                  } else {
                    req.body.image = result.url;
                    resolve(result);
                  }
                }
              )
              .end(buffer);
          }
        });
      });

      await Promise.all(uploadPromises);
    }

    const checkOut = new Date();
    let hours = differenceInHours(
      new Date(checkOut),
      new Date(parking.checkIn)
    );

    if (hours < 0) {
      hours = 1;
    }

    parking.imageOut = req.body.image;
    parking.checkOut = checkOut;
    parking.totalPayment = hours * parking.slot?.area.price;

    await parking.save();
    await Slot.findByIdAndUpdate(parking.slot, { status: "available" });
    await Notification.create({
      title: "Parking Payment",
      description: `${parking.plate} has been paid with total payment ${parking.totalPayment}!`,
      sender: parking.id,
    });

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateParkingSlot = async (req, res) => {
  try {
    const { lp_part1, lp_part2, slot } = req.body;
    const plate = `${lp_part1}-${lp_part2}`;
    const parking = await Parking.findOne({ plate });
    const slotData = await Slot.findOne({ name: slot });

    if (!parking) {
      throw new Error("Parking not found!");
    }

    if (!slotData) {
      throw new Error("Slot not found!");
    }

    if (parking.slot) {
      throw new Error("Parking already have slot!");
    }

    parking.slot = slotData.id;

    (await parking.save()).populate("slot");
    await Slot.findByIdAndUpdate(slotData.id, { status: "unavailable" });
    await Notification.create({
      title: "Parking Slot",
      description: `${parking.plate} has been parked in ${slotData.name}!`,
      sender: parking.id,
    });

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
