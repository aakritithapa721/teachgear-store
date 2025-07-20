const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads");

    },
    filename: (req, file, cb) => {
        const filename = file?.originalname?.replace(/\s/g, "_");
        cb(null, filename);
    },
});
var fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf|epub|djvu|PFD|DJVU|png)$/)){
        return callback(new Error('Invalid file format'),false)
    }
    callback(null, true)

}

const fileUpload = (fieldname) => (req, res, next) => {
    multer({
        storage,
        fileFilter: fileFilter,
    }).array(fieldname, 100)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }
        if (req.files) {
            console.log("Uploaded Files:");
            req.files.forEach(file => {
                console.log(` - ${file.originalname} -> ${file.filename}`);
            });
        }
        next();
    });
};

module.exports = fileUpload