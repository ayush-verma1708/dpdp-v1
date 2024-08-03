import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), (req, res) => {
  try {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to upload file',
      error: error.message
    });
  }
});

export default router;
