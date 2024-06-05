const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const documentService = require('../services/Document');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/upload/db', upload.single('file'), async (req, res, next) => {
  try {
    const file = req.file;
    const document = await documentService.addDocument(file);
    res.status(201).json(document);
  } catch (err) {
    next(err);
  }
});

router.get('/download/:id/db', async (req, res, next) => {
  try {
    const id = req.params.id;
    const document = await documentService.findDocumentById(id);
    const filePath = `uploads/${document.docName}`;
    const fileStream = fs.createReadStream(filePath);

    res.setHeader('Content-Disposition', `attachment; filename="${document.docName}"`);
    res.setHeader('Content-Type', 'application/pdf');
    fileStream.pipe(res);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await documentService.deleteDocument(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
