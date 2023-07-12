const multer = require("multer");
const { v1: uuid } = require("uuid");


const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000, // 5kb file
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      // Where you want to store the image files (in upload folder)
      callback(null, "uploads/images");
    },
    filename: (req, file, callback) => {
      // Get the extension of the type of image file uploaded
      const ext = MIME_TYPE_MAP[file.mimetype];
      callback(null, uuid() + "." + ext);
    },
  }),
  // Validation for file upload
  fileFilter: (req, file, callback) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    callback(error, isValid);
  },
});

module.exports = fileUpload;
