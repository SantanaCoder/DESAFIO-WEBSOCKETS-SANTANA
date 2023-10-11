const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now()
        const originalName = file.originalname
        const ext = path.extname(originalName)
        cb(null,`${timestamp}-${originalName}`) 
    }
});

const upload = multer({storage});

module.exports = upload; 
