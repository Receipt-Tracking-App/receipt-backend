const multer = require("multer");
const config = require("../../config");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: config.services.cloudinary.cloudName,
  api_key: config.services.cloudinary.apiKey,
  api_secret: config.services.cloudinary.apiSecret
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: "receipts",
  allowedFormats: ["jpg", "png"],
  transformation: [{ width: 500, height: 500, crop: "limit" }]
});
module.exports = multer({ storage: storage });
