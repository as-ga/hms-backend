import env from "dotenv";

env.config({ path: ".env" });

const conf = {
  Port: String(process.env.PORT || 3000),
  dbURI: String(process.env.DATABASE_URI),
  dbName: String(process.env.DB_NAME || "HMS"),
  accessTokenSecret: String(process.env.ACCESS_TOKEN_SECRET),
  accessTokenExpiry: String(process.env.ACCESS_TOKEN_EXPIRY || "2d"),
  refreshTokenSecret: String(process.env.REFRESH_TOKEN_SECRET),
  refreshTokenExpiry: String(process.env.REFRESH_TOKEN_EXPIRY || "7h"),
};

export default conf;
