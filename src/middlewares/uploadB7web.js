import multer from 'multer';
import jimp from 'jimp';
import crypto from 'crypto';
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', '..', './tmp/uploads/users');

const fileFilter = (request, file, callback) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if(allowed.includes(file.mimetype)) {
      return callback(null, true);
    } else {
      return callback({message: "File not supported"}, false);
    }
  }

const multerOption = {
  destination: tmpFolder,
  storage:multer.memoryStorage(),
  fileFilter: fileFilter,
}

const upload = multer(multerOption).single('photo');

const resize = async (request, response, next) => {
  if(!request.file) {
    return next();
  }

  const ext = request.file.mimetype.split('/')[1];
  const fileHash = crypto.randomBytes(10).toString('hex');
  const fileName = `${fileHash}.${ext}`;

  request.body.photo = fileName;
  const photo = await jimp.read(request.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`/public/uploads/${fileName}`);
  return next();
};

export { upload, resize };
