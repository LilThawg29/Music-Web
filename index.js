const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const accountRouter = require("./Routers/account");
const musicRouter = require("./Routers/music");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB_URL, () => {
    console.log("Connected to MongoDB");
});

app.use(cors());
app.use(express.json());

app.use("/api/account", accountRouter);
app.use("/api/music", musicRouter);

app.listen(3000, () => {
    console.log("Server is running");
});