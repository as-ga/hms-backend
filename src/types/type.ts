export interface userSchemaType extends Document {
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatar: string;
  gender: string;
  dob: Date;
  address: Array<any>;
  userType: string;
  password: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}
