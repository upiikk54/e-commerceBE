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
const categoryController = require('./controllers/categoryController');

// import middlewares
const middlewares = require('./middlewares/auth')

// API Auth
app.post("/api/v1/register", authController.handleRegister);
app.post("/api/v1/login", authController.handleLogin);
app.get("/api/v1/me", middlewares.authenticate, authController.currentUser);
app.put("/api/v1/forgot-password", authController.handleForgotPassword);
app.put("/api/v1/reset-password", authController.handleResetPassword);

// API Category
app.post("/api/v1/create-category", middlewares.authenticate, categoryController.handleCreateCategory);
app.get("/api/v1/get-all", categoryController.handleGetAllCategory);
app.get("/api/v1/get-by-id/:id", middlewares.authenticate, categoryController.handleGetCategoryById);
app.delete("/api/v1/delete-category/:id", middlewares.authenticate, categoryController.handleDeleteCategoryById);
app.put("/api/v1/update-category/:id", middlewares.authenticate, categoryController.handleUpdateCategoryById);

app.listen(process.env.PORT || PORT, () => {
    console.log(
        `server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`
    );
});