const express = require("express");
const connectDB = require('./src/db/connectDb');
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Make the 'uploads' folder accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", require("./src/router/auth.router"));
app.use("/api/course", require("./src/router/course.router"));

app.listen(process.env.PORT,() => {
    console.log('server is running on port '+process.env.PORT)
})