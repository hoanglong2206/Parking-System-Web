const User = require("../models/user");

exports.getMe = (req, _res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getAllUser = async (_req, res) => {
  try {
    const users = await User.find({ role: "user" });

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};
