import dotenv from "dotenv";
import express from 'express';

dotenv.config({ path: "./.env" })

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hospital Management System (HMS) Backend');
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
