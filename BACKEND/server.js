require("dotenv").config();
const express = require("express");
const connect_db = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

// connect mongodb
connect_db();

// routes
app.use('/api/v1/users', userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
