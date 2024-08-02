import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// POST route to handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    // File information is available in req.file
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

// const express = require('express');
// const multer = require('multer');
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Ensure this directory exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}.pdf`);
//   }
// });

// const upload = multer({ storage: storage });

// router.post('/upload', upload.single('file'), (req, res) => {
//   try {
//     // Handle file information and save to database if needed
//     res.status(200).send('File uploaded successfully');
//   } catch (error) {
//     res.status(500).send('Failed to upload file');
//   }
// });

// module.exports = router;
