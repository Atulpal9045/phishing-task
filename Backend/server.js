const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const env = require("dotenv");
const routers = require("./routes/routes");
const cors = require("cors");
env.config();

async function connect() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}
connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", routers);

let PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
  console.log("server is running on: ", PORT);
});
