import cloudinary from "../../config/cloudinary.js";

const UploadCtrl = {};

UploadCtrl.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

    // If Cloudinary credentials are fully configured, upload directly to Cloudinary
    if (CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET) {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "laptop_components",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            // Fallback to base64 if Cloudinary API call errors out
            const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
            return res.json({ url: base64Data });
          }
          return res.json({ url: result.secure_url });
        }
      );
      uploadStream.end(req.file.buffer);
    } else {
      // Graceful fallback to Data URI when Cloudinary credentials are not provided
      const base64Data = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      res.json({ url: base64Data });
    }
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ error: "Failed to upload image" });
  }
};

export default UploadCtrl;
