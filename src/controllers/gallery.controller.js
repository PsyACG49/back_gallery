const Img = require("../models/image");
const fs = require("fs-extra");

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createImage = async (req, res) => {
  const { title, description } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const newImg = new Img({
    title: title,
    description: description,
    imgUrl: result.url,
    public_id: result.public_id,
  });

  await newImg.save();
  await fs.unlink(req.file.path);

  res.json("recived");
};

const getImages = async (req, res) => {
  const imgs = await Img.find();
  res.json(imgs);
};

const getImage = async (req, res) => {
  const { img_id } = req.params;
  const image = await Img.findById(img_id);
  res.json(image);
};

const deleteImage = async (req, res) => {
  const { img_id } = req.params;
  const img = await Img.findByIdAndRemove(img_id);
  const result = await cloudinary.v2.uploader.destroy(img.public_id);
  res.json("image deleted");
};

const updateImage = (req, res) => {};

module.exports = { createImage, getImages, getImage, deleteImage, updateImage };
