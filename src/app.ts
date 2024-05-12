import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hospital Management System (HMS) Backend");
});

export { app };
