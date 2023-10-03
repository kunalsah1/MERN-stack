require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeeRouter = require('./routes/employeeRouter')
const cors = require('cors')
const port = 5000;
const app = express();
app.use(cors())

app.use(express.json());

// Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use('/employees', employeeRouter)

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






