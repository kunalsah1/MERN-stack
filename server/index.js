require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeeRouter = require("./routes/employeeRouter");
const cors = require("cors");
const userVerification = require("./middleware/middleware");
const cookieParser = require("cookie-parser");
const { signup, login, logout } = require("./routes/userRouter");
const port = 5000;
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());



app.use("/signup", signup);
app.use("/login", login);
app.use("/employees",userVerification,  employeeRouter);
app.use("/logout", logout);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo connected");
    app.listen(port, () => {
      console.log(`server running at http://localhost:5000`);
    });
  })
  .catch((error) => {
    return res.json(error);
  });
