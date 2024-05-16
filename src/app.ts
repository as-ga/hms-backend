import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import conf from "./conf/conf.js";

const app = express();

app.use(cors({ origin: conf.corsOrigin, credentials: true }));

app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ limit: "50kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hospital Management System (HMS) Backend");
});

// import Routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);

export { app };
