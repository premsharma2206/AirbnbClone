const controller = {};
const propertyModel = require("../models/property");
const reviewModel = require("../models/review");
var path = require('path');

controller.registerProperty = async (req, res, next) => {
  try {
    
    let property = new propertyModel({
      title: req.body.title,
      location:  req.body.location,
      description:  req.body.description,
      cleaningfee:  req.body.cleaningfee,
      servicefee:  req.body.servicefee,
      amenities:  req.body.amenities,
      bedrooms:  req.body.bedrooms,
      pricepernight: req.body.pricepernight,
      shortdescription:  req.body.shortdescription,
      imageName: req.body.imageName
    });
    property.save();
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getAllProperty = async (req, res, next) => {
  try {
    let property = await propertyModel.find({});
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getProperty = async (req, res, next) => {
  try {
    let property = await propertyModel.findOne({ _id: req.params.propertyId });
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.updateProperty = async (req, res, next) => {
  try {
    let property = await propertyModel.findOneAndUpdate(
      { _id: req.params.propertyId },
      {
        $set: req.body,
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.deleteProperty = async (req, res, next) => {
  try {
    let property = await propertyModel.findOneAndUpdate(
      { _id: req.params.propertyId },
      {
        $set: {
          isAvailable : false,
        },
      },
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return res.status(200).json({ message: "success", data: property });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.addReview = async (req, res, next) => {
  try {
    console.log(req.user);
    console.log(req.body);
    req.body.user_id = req.user._id;
    let review = await reviewModel(req.body);
    await review.save();
    return res.status(200).json({ message: "success", data: review });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};

controller.getReviews = async (req, res, next) => {
  try {
    let review = await reviewModel
      .find({ properties_id: req.params.propertyId })
      .populate("user_id");
    return res.status(200).json({ message: "success", data: review });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
module.exports = controller;
