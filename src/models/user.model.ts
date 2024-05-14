import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import conf from "../conf/conf.js";
import { userSchemaType } from "../types/type.js";

const AddressSchema = new Schema({
  address1: {
    type: String,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  pincode: {
    type: String,
  },
});

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username"],
      unique: [true, "Username already exists"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "Email already exists"],
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      unique: [true, "Phone number already exists"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, "Please select your gender"],
      enum: ["male", "female", "other"],
    },
    dob: {
      type: Date,
    },
    address: [AddressSchema],
    userType: {
      type: String,
      enum: ["admin", "doctor", "staff", "other", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
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