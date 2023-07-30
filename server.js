const express = require("express");
const app = express();
const PORT = 8980;
const bodyParse = require("body-parser");
const cors = require("cors");
const path = require("path");

app.use(express.json());
app.use(
    bodyParse.urlencoded({
        extended: false,
    })
);
app.use(cors());

// import controller
const authController = require('./controllers/authController');

// import middlewares
const middlewares = require('./middlewares/auth')

// API Auth
app.post("/api/v1/register", authController.handleRegister);
app.post("/api/v1/login", authController.handleLogin);
app.get("/api/v1/me", middlewares.authenticate, authController.currentUser);

app.listen(process.env.PORT || PORT, () => {
    console.log(
        `server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`
    );
});