const express = require("express");
const connectDB = require('./src/db/connectDb');
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://balajicourse.netlify.app/', // Allow your Angular app
    methods: ["GET", "POST"],
    credentials: true,
}));

// ✅ Make the 'uploads' folder accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.use("/api/auth", require("./src/router/auth.router"));
app.use("/api/course", require("./src/router/course.router"));

app.listen(process.env.PORT,() => {
    console.log('server is running on port '+process.env.PORT)
})