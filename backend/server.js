const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors=require('cors')
app.use(cors());
dotenv.config();
const userRoute = require("./routes/userRoute");
app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });

app.use(userRoute);
