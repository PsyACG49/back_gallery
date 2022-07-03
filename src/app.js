const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const galleryRoutes = require("./routes/gallery.routes");

//initialization
const app = express();
require("./database");

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});

app.use(multer({ storage }).single("image"));

//Routes
app.use("/api/v1/images", galleryRoutes);

module.exports = app;
