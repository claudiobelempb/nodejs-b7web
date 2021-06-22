import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', './tmp/uploads/users');
console.log(tmpFolder);

const uploadImage = {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
  fileFilter: (request, file, callback ) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if(allowed.includes(file.mimetype)) {
      return callback(null, true);
    } else {
      return callback({message: "File not supported"}, false);
    }
  }
}

export { uploadImage };