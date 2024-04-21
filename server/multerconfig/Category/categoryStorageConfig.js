const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Define the directory path
const uploadDirectory = "./categoryuploads";

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDirectory);
    },
    filename: (req, file, callback) => {
        const filename = file.originalname;
        callback(null, filename);
    }
});

// File filter function
const filefilter = (req, file, callback) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp" || file.mimetype === "image/avif") {
        callback(null, true);
    } else {
        callback(new Error("Only PNG, JPG, JPEG, WEBP, and AVIF formatted files are allowed"));
    }
};

// Multer instance
const categoryupload = multer({
    storage: storage,
    fileFilter: filefilter
});

module.exports = categoryupload;
