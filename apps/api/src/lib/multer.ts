import multer from 'multer';

// Configure multer with memoryStorage and file size limit
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024, // 100 KB in bytes
  },
});
export { upload };

const cvUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1 * 1024 * 1024, // 1 MB in bytes
  },
});
export { cvUpload };
