const { Router } = require("express");
const router = Router();
const ctrGallery = require("../controllers/gallery.controller");

router.post("/upload", ctrGallery.createImage);

router.get("/", ctrGallery.getImages);

router.get("/:img_id", ctrGallery.getImage);

router.delete("/:img_id", ctrGallery.deleteImage);

module.exports = router;
