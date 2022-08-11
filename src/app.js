const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const galleryRoutes = require("./routes/gallery.routes");
const cardRoutes = require("./routes/card.router");
const authRoutes = require("./routes/auth.routes");

//initialization
const app = express();
require("./database");

//Settings
app.set("port", process.env.PORT || 4000);

//Middlewares
app.use(morgan("dev"));
app._router.use(cors());
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
app.use("/api/v1/cards", cardRoutes);
app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something was wrong";
  return res.status(errorStatus).json({
    seccess: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

module.exports = app;
