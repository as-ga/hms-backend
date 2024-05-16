import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import conf from "../conf/conf.js";
import { userSchemaType } from "../types/type.js";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "Email already exists"],
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },

    phone: {
      type: String,
      required: [true, "Please enter your phone number this is required"],
      unique: [true, "Phone number already exists"],
    },

    fullName: {
      type: String,
      required: [true, "Please enter your full name"],
    },

    avatar: {
      type: String,
    },

    gender: {
      type: String,
      required: [true, "Please select your gender"],
      enum: ["male", "female", "other"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    userType: {
      type: String,
      enum: ["admin", "doctor", "staff", "other", "user"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      userType: this.userType,
    },
    conf.accessTokenSecret,
    {
      expiresIn: conf.accessTokenExpiry,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign({ _id: this._id }, conf.refreshTokenSecret, {
    expiresIn: conf.refreshTokenExpiry,
  });
};

export const User = mongoose.model<userSchemaType>("User", userSchema);
