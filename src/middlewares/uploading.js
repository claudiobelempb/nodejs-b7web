import multer from 'multer';
import crypto from 'crypto';
import MulterSharpResizer from 'multer-sharp-resizer';

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
// const multerFilter = (request, file, callback) => {
//   if(file.mimetype.starsWith("image")) {
//     callback(null, true);
//   }else{
//     callback(null, false);
//   }
// }

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Multer .fields() filename
const uploadProductImages = upload.fields([
  {name: "avatar", maxCount: 1},
  {name: "cover", maxCount: 1},
  {name: "gallery", maxCount: 4},
]);

// multer .array() 
// const uploadProductImages = upload.array("gallery", 4)

// multer .single() 
// const uploadProductImages = upload.single("cover", 1)

const resizerImage = async (request, file, next) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");

  // const fileHash = crypto.randomBytes(10).toString('hex');
  // const fileName = `${fileHash}-${file.originalname}`;
  const filename = {
    avatar: `avatar-${Date.now()}`,
    cover: `cover-${Date.now()}`,
    gallery: `gallery-${Date.now()}`,
  }

  const sizer = [
    {path: "original", width: null, height: null},
    {path: "large", width: 600, height: 400},
    {path: "medium", width: 300, height: 160},
    {path: "small", width: 150, height: 150},
    {path: "thumbnail", width: 100, height: 100},
  ];

  // expo public/uploads/2021/06/posts/user/medium/image.png
  const uploadPath = `./public/uploads/${year}/${month}`;
  console.log(uploadPath);

  // expo public/uploads/2021/06/posts/user/medium/image.png
  const fileUrl = `${request.protocol}://${request.get("host")}/uploads/${year}/${month}`;
  console.log(fileUrl);

  // sharp options
  const sharpOptions = {
    fit: "contain",
    background: {r: 255, g: 255, b: 255},
  }

  const resizeObj = new MulterSharpResizer(
    request,
    filename,
    sizer,
    uploadPath,
    fileUrl,
    sharpOptions,
  );

  await resizeObj.resize();
  const getDataUpload = resizeObj.getData();

  // get details of uploads files: user by multer fields
  request.body.avatar = getDataUpload.avatar;
  request.body.cover = getDataUpload.cover;
  request.body.gallery = getDataUpload.gallery;
  
  next();
}

export { uploadProductImages, resizerImage };
