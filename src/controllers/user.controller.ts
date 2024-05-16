import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/uploadFile.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req: any, res: any) => {
  const { email, fullName, password, phone, gender } = req.body;
  // console.log('email:',email, 'fullName:',fullName, 'password:',password, 'phone:',phone, 'gender:',gender)

  if (
    [fullName, email, phone, password, gender].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ $or: [{ phone }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with Emai or Phone already exists");
  }

  const avatarLocalPath = req.file?.path;
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // console.log("Avatar:", avatar);

  const user = await User.create({
    fullName,
    email,
    phone,
    password,
    gender,
    avatar: avatar?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

export { registerUser };
