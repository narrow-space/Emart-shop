const multer = require("multer");
const fs = require("fs");

// Define the directory path
const uploadDirectory = "./productimages";

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
const fileFilter = (req, file, callback) => {
    // Check if the file type is allowed
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp" || file.mimetype === "image/avif") {
        // Accept the file
        callback(null, true);
    } else {
        // Reject the file
        callback(new Error("Only PNG, JPG, JPEG, WEBP, and AVIF formatted files are allowed"));
    }
};

// Multer instance
const productsUpload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = productsUpload;