const { Router } = require("express");
const router = Router();
const {
  createImage,
  getImages,
  getImage,
  deleteImage,
} = require("../controllers/gallery.controller");

router.post("/upload", createImage);

router.get("/", getImages);

router.get("/:img_id", getImage);

router.delete("/:img_id", deleteImage);

module.exports = router;
