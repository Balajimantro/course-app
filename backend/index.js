const express = require("express");
const connectDB = require('./src/db/connectDb');
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const auth = require("./src/router/auth.router");
const course = require("./src/router/course.router")

const allowedOrigins = [
    // 'http://localhost:4200', 
    'https://balajicourse.netlify.app',
  ];

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],  
    allowedHeaders: ["Content-Type", "Authorization"],  
    credentials: true 
}));

// ✅ Make the 'uploads' folder accessible
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

app.use("/api/auth", auth);
app.use("/api/course", course);

app.listen(process.env.PORT,() => {
    console.log('server is running on port '+process.env.PORT)
})