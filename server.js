const express = require("express");
const app = express();
const PORT = 8980;
const bodyParse = require("body-parser");
const cors = require("cors");
const path = require("path");
const upload = require('./utils/fileUpload');

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
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const userController = require('./controllers/userController');
const favoritController = require('./controllers/favoritController');

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
app.get("/api/v1/get-all-category", categoryController.handleGetAllCategory);
app.get("/api/v1/get-by-id-category/:id", middlewares.authenticate, categoryController.handleGetCategoryById);
app.delete("/api/v1/delete-category/:id", middlewares.authenticate, categoryController.handleDeleteCategoryById);
app.put("/api/v1/update-category/:id", middlewares.authenticate, categoryController.handleUpdateCategoryById);

// API Product
app.post("/api/v1/create-product", middlewares.authenticate, upload.fields([{name: "image"}]), productController.handleCreateProduct);
app.get("/api/v1/get-all-product", productController.handleGetAllProduct);
app.get("/api/v1/get-by-id-product/:id", productController.handleGetProductById);
app.put("/api/v1/update-product/:id", middlewares.authenticate, upload.fields([{name: "image"}]), productController.handleUpdateProductById);
app.delete("/api/v1/delete-product/:id", middlewares.authenticate, productController.handleDeleteProductById);

// API Cart
app.post("/api/v1/create-cart", middlewares.authenticate, cartController.handleCreateCart);
app.get("/api/v1/get-all-cart", cartController.handleGetAllCart);
app.get("/api/v1/get-data-cart/:id", middlewares.authenticate, cartController.handleCartById);
app.get("/api/v1/users/:id/cart", middlewares.authenticate, userController.handleGetCartByUserId);
app.delete("/api/v1/delete-cart/:id", middlewares.authenticate, cartController.handleDeleteCartById);

// API Favorit
app.post("/api/v1/create-favorit", middlewares.authenticate, favoritController.handleCreateFavorit);
app.get("/users/:id/get-favorit", middlewares.authenticate, userController.handleGetFavoritByUserId);

app.listen(process.env.PORT || PORT, () => {
    console.log(
        `server berhasil berjalan di port http://localhost:${process.env.PORT || PORT}`
    );
});