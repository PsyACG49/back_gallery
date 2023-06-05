const Img = require("../models/image");
const fs = require("fs-extra");

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createImage = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const newImg = new Img({
      title: title,
      description: description,
      imgUrl: result.url,
      public_id: result.public_id,
    });
    await newImg.save();
    await fs.unlink(req.file.path);
    res.status(200).json("recived");
  } catch (error) {
    next(error);
  }
};

const getImages = async (req, res, next) => {
  try {
    const imgs = await Img.find();
    res.status(200).json(imgs);
  } catch (error) {
    next(error);
  }
};

const getImage = async (req, res, next) => {
  const { img_id } = req.params;
  try {
    const image = await Img.findById(img_id);
    res.status(200).json(image);
  } catch (error) {
    next(error);
  }
};

const deleteImage = async (req, res, next) => {
  const { img_id } = req.params;
  try {
    const img = await Img.findByIdAndRemove(img_id);
    await cloudinary.v2.uploader.destroy(img.public_id);
    res.status(200).json("image deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = { createImage, getImages, getImage, deleteImage };
