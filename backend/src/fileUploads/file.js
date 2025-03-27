const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the upload folder
const uploadDir = 'uploads';

// Check if the folder exists, if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create folder if it doesn’t exist
}

// Configure Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir); // Store images in 'uploads/' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

module.exports = upload;
