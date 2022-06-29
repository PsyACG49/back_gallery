const { Router } = require("express");
const router = Router();

const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Img = require("../models/image");
const fs = require("fs-extra");

router.post("/api/images/upload", async (req, res) => {
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
});

router.get("/api/images", async (req, res) => {});

router.get("/api/images/:id", async (req, res) => {});

router.delete("/api/images/:id", async (req, res) => {});

module.exports = router;
