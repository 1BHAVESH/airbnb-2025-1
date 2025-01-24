import multer from "multer";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Accept only images
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
})

export const uploadFiles = upload.fields([
  { name: "mainImage", maxCount: 1 }, // Single main image
  { name: "images", maxCount: 5 }, // Multiple images
]);

export default uploadFiles;



// import multer from "multer"

// const upload = multer({dest: "uploads/"})

// export default upload

