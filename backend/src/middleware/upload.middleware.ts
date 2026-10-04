import multer from "multer";
import { NextFunction, Request, Response } from "express";
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE, getExtension } from "../utils/filePolicy";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
  fileFilter: (req, file, cb) => {
    const ext = getExtension(file.originalname);
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return cb(new Error(`File type "${ext || "none"}" is not allowed`));
    }
    cb(null, true);
  },
});

export const uploadSingleFile = (req: Request, res: Response, next: NextFunction) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      const message =
        err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE"
          ? "File exceeds the 5 MB limit"
          : err.message;
      res.status(400).json({ message });
      return;
    }
    next();
  });
};