export interface userSchemaType extends Document {
  email: string;
  phone: string;
  fullName: string;
  avatar: string;
  gender: string;
  userType: string;
  password: string;
  isVerified: boolean;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}
