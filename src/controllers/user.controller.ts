import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/uploadFile.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId: any) => {
  try {
    const user: any = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access tokens"
    );
  }
};

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

const loginUser = asyncHandler(async (req: any, res: any) => {
  const { phone, email, password } = req.body;
  // console.log("data :", email, phone, password);

  if (!(email || phone)) {
    throw new ApiError(400, "Email or Phone is required");
  }

  const user: any = await User.findOne({ email });
  // console.log("user :", user);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  // isPasswordCorrect
  const isPasswordValide = await user.isPasswordCorrect(password);
  // console.log("isPasswordValide :", isPasswordValide);

  if (!isPasswordValide) {
    throw new ApiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req: any, res: any) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

export { registerUser, loginUser, logoutUser };
