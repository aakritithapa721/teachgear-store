
const multer = require('multer');
const path = require('path');

// Create the uploads directory if not exists
const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in /uploads
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/\s/g, '_');
    cb(null, `${timestamp}_${sanitized}`);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|jpeg|gif|webp)$/i)) {
    return cb(new Error('Invalid file format. Only image files are allowed.'));
  }
  cb(null, true);
};

// Exported middleware
const fileUpload = (fieldname) => (req, res, next) => {
  multer({ storage, fileFilter }).single(fieldname)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: err.message });
    }
    next();
  });
};

module.exports = fileUpload;