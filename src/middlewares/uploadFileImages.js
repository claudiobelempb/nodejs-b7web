import multer from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '../', '../', 'public/assets/uploads');
const multerStorage = multer.memoryStorage();

// Filter files with multer
const multerFilter = (request, file, callback ) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png"];
  if(allowed.includes(file.mimetype)) {
    return callback(null, true);
  } else {
    return callback({message: "File not supported"}, false);
  }
}

const upload = multer({
  destination: tmpFolder,
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Multer .fields() filename
const uploadFileImages = upload.fields([
  {name: "avatar", maxCount: 1},
  {name: "cover", maxCount: 1},
  {name: "gallery", maxCount: 4},
]);
// multer .array() 
// const uploadProductImages = upload.array("gallery", 4)

// multer .single() 
// const uploadProductImages = upload.single("cover", 1)

export { uploadFileImages };
