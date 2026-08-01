const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// =======================
// Upload Profile Image
// =======================
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "portfolio/images",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    return res.status(200).json({
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Upload Resume (PDF)
// =======================
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No resume uploaded",
      });
    }

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "portfolio/resumes",
            resource_type: "raw",

            // Preserve original filename
            use_filename: true,
            unique_filename: false,
            overwrite: true,

            // Keep the original filename (without extension)
            public_id: `portfolio/resumes/${req.file.originalname.replace(
              /\.[^/.]+$/,
              ""
            )}`,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    console.log("Resume Uploaded:", result);

    return res.status(200).json({
      resumeUrl: result.secure_url,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadImage,
  uploadResume,
};