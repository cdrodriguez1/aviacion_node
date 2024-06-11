const multer = require("multer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: false,
});

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
  destination: (req, file, cb) => {
    const folder = path.join(__dirname, "../../public/uploads");
    cb(null, folder);
  },
  onError: function (error, next) {
    console.log("multer storage error: ", error);
    next(error);
  },
  createParentPath: true,
});

const VALID_FILE_TYPE = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (VALID_FILE_TYPE.includes(file.mimetype)) {
    const error = new Error("File not supported");
    cb(error);
  } else {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
