const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../photos/'));
    },
    filename(req, file, cb) {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const randomString = crypto.randomBytes(8).toString('hex');
        const filename = `${timestamp}-${randomString}.png`; // You can adjust the extension as needed

        cb(null, filename);
    },
});

const types = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
module.exports = multer({ storage, fileFilter });
