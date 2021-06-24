import MulterSharpResizer from 'multer-sharp-resizer';
// import path from 'path';

const resizeFileImages = async (request, file, next) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = `${today.getMonth() + 1}`.padStart(2, "0");
  // const tmpFolder = path.resolve(__dirname, '../', '../', 'public/assets/uploads');

  const filename = {
    avatar: `avatar-${Date.now()}`,
    cover: `cover-${Date.now()}`,
    gallery: `gallery-${Date.now()}`,
    file: `file`,
  }

  const sizer = [
    {path: "original", width: null, height: null},
    {path: "large", width: 600, height: 400},
    {path: "medium", width: 300, height: 160},
    {path: "small", width: 150, height: 150},
    {path: "thumbnail", width: 100, height: 100},
  ];

  // expo public/uploads/2021/06/posts/user/medium/image.png
  const uploadPath = `./public/assets/uploads/${year}/${month}`;
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

export { resizeFileImages };