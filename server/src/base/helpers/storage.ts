import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';

const normalizeFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();
  callback(null, `${uuidv4()}.${fileExtName}`);
};

export const fileStorage = diskStorage({
  // destination: '../clientnext/public/img/fullImage-news',
  destination: '../tmp/',
  filename: normalizeFileName,
});
