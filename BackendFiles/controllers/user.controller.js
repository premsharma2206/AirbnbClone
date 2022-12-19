const controller = {};
const userModel = require("../models/user");
const favouriteModel = require("../models/favourite");
const reservationModel = require("../models/reservation");

const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const bcrypt = require("bcrypt");
const { token } = require("morgan");
const saltRounds = 10;

controller.protected = async (req, res, next) => {
  try {
    return res.status(200).json(req.user);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.registerUser = async (req, res, next) => {
  try {
    let password = "";
    let user = await userModel.findOne({ emailId: req.body.emailId.toLowerCase() });
    if (user) {
      return res.status(400).json({ message: "failed", data: "user alread exist" });
    }
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      if (err) {
        console.log(err);
        return;
      }
      password = hash;
      req.body.password = password;
      req.body.emailId = req.body.emailId.toLowerCase();
      let user = new userModel(req.body);
      await user.save();
      return res.status(200).json({ message: "success", data: user });
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.login = async (req, res, next) => {
  try {
    let emailId = req.body.emailId;
    let user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).json({ message: "failed", data: "no user found" });
    }
    let result = await bcrypt.compare(
      req.body.password,
      user.password,
      function (err, result) {
        if (err) {
          console.log(err);
          return false;
        }
        if (result) {
          // result == true
          let tokenObj = {
            _id: user._id,
            emailId: user.emailId,
          };
          // token = jwt.sign(tokenObj, SECRET, { expiresIn: "12h" });
          let token = jwt.sign(tokenObj, SECRET);

          return res.status(200).json({
            token: token,
            message: "success",
            emailId: user.emailId,
            userType: user.userType,
          });
        } else {
          return res.status(401).json({ message: "unauthorized" });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  }
};
controller.getAllUser = async (req, res, next) => {
  try {
    let users = await userModel.find({});
    return res.status(200).json({ message: "success", data: users });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getUser = async (req, res, next) => {
  try {
    let user = await userModel.findOne({ _id: req.params.userId });
    return res.status(200).json({ message: "success", data: user });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.updateUser = async (req, res, next) => {
  try {
    let user = await userModel.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return res.status(200).json({ message: "success", data: user });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
controller.deleteUser = async (req, res, next) => {
  try {
    let user = await userModel.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          deleted: true,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return res.status(200).json({ message: "success", data: user });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getUserFavourites = async (req, res, next) => {
  try {
    let favourite = await favouriteModel.find({ user_id: req.user._id });
    favourite = favourite ? favourite : [];
    // let favourite = await favouriteModel.find({});

    return res.status(200).json({ message: "success", data: favourite });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getDetailedFavourites = async (req, res, next) => {
  try {
    console.log("requesttttt.bodyyyy===",req.user);
    let favourite = await favouriteModel
      // .find({})
      .find({ user_id: req.user._id })
      .populate(["user_id", "property_id"])
      .exec();
    favourite = favourite ? favourite : [];
    return res.status(200).json({ message: "success", data: favourite });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getReservations = async (req, res, next) => {
  try {
    let reservation = await reservationModel
      // .find({})
      .find({ user_id: req.user._id, isCancelled: false })
      .populate(["user_id", "property_id"])
      .exec();
    reservation = reservation ? reservation : [];
    return res.status(200).json({ message: "success", data: reservation });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.addReservation = async (req, res, next) => {
  try {
    console.log("addreservation =======",req.body);
    req.body.user_id = req.user._id;

    let reservation = new reservationModel(req.body);
    await reservation.save();
    return res.status(201).json({ message: "success", data: reservation });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
module.exports = controller;
