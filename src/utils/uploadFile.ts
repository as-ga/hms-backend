import { v2 as cloudinary } from "cloudinary";
import conf from "../conf/conf.js";
import fs from "fs";

cloudinary.config({
  cloud_name: conf.cloudinaryCloudName,
  api_key: conf.cloudinaryApiKey,
  api_secret: conf.cloudinaryApiSecret,
});

const uploadOnCloudinary = async (
  localFilePath: any,
  avatar: string = "avatars"
) => {
  try {
    console.log("localFilePath cloud:", localFilePath);
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: `hms/${avatar}`,
    });
    // console.log("Cloudinary response:", response);
    return response;
  } catch (error) {
    console.log("err:", error);
    return null;
  } finally {
    fs.unlinkSync(localFilePath);
  }
};

export { uploadOnCloudinary };
