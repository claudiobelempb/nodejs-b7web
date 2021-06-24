import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '../', '../', 'public/assets/uploads');
console.log(tmpFolder);

const uploadCelke = {
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
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
      return callback(null, true);
    } else {
      return callback(null, false);
    }
  }
}

export { uploadCelke };