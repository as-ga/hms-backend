import connectDB from "./db/dbConnect.js";
import conf from "./conf/conf.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(conf.Port || 8000, () => {
      console.log(
        `Server is running on  : http://localhost:${conf.Port || 8000}`
      );
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed", err);
  });
