const productService = require('../services/productService');

const handleCreateProduct = async (req, res) => {
    const {
        nameProduct,
        productDescription,
        productPrice,
        productStock,
        categoryId
    } = req.body;

    const userId = req.user.id;

    const {
        status,
        status_code,
        message,
        data
    } = await productService.handleCreateProduct({
        nameProduct,
        productDescription,
        productPrice,
        productStock,
        categoryId,
        userId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetAllProduct = async (req, res) => {
    const {
        status,
        status_code,
        message,
        data
    } = await productService.handleGetAllProduct();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetProductById = async (req, res) => {

    const {
        id
    } = req.params;

    const {
        status,
        status_code,
        message,
        data
    } = await productService.handleGetProductById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
};

const handleUpdateProductById = async (req, res) => {
    const {
        nameProduct,
        productDescription,
        productPrice,
        productStock,
        categoryId
    } = req.body;

    const {id} =req.params

    const userId = req.user.id

    const {
        status,
        status_code,
        message,
        data
    } = await productService.handleUpdateProductById({
        nameProduct,
        productDescription,
        productPrice,
        productStock,
        categoryId,
        userId,
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
}

module.exports = {
    handleCreateProduct,
    handleGetAllProduct,
    handleGetProductById,
    handleUpdateProductById
}