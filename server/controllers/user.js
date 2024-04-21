const User = require("../models/user");

exports.getMe = (req, _res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getUser = async (req, res) => {
  try {
    let user;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(req.params.id);
    }

    if (!user) {
      throw new Error("No user found!");
    }

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
        length: users.length,
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
