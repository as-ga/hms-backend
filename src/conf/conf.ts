import env from "dotenv";

env.config({ path: ".env" });

const conf = {
  Port: String(process.env.PORT || 3000),
  dbURI: String(process.env.DATABASE_URI),
  dbName: String(process.env.DB_NAME || "HMS"),
};

export default conf;
