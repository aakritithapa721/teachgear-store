const multer = require('multer');
const path = require('path');

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.replace(/\s/g, '_');
    cb(null, `${Date.now()}_${filename}`);
  }
});

// File filter to restrict allowed types
const fileFilter = (req, file, callback) => {
  const allowedTypes = /\.(pdf|epub|djvu|png|jpg|jpeg)$/i;
  if (!file.originalname.match(allowedTypes)) {
    return callback(new Error('Invalid file format'), false);
  }
  callback(null, true);
};

// Custom middleware for single file upload
const fileUpload = (fieldname) => (req, res, next) => {
  multer({
    storage,
    fileFilter
  }).single(fieldname)(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (req.file) {
      console.log(`Uploaded File: ${req.file.originalname} -> ${req.file.filename}`);
    }

    next();
  });
};

module.exports = fileUpload;
