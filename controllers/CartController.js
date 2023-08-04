const cartService = require('../services/cartService');

const handleCreateCart = async (req, res) => {
    const {
        productId,
        quantity
    } = req.body;

    const userId = req.user.id;

    const {
        status,
        status_code,
        message,
        data
    } = await cartService.handleCreateCart({
        userId,
        productId,
        quantity
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetAllCart = async (req, res) => {

    const {
        status,
        status_code,
        message,
        data
    } = await cartService.handleGetAllCart();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleCartById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        status_code,
        message,
        data
    } = await cartService.handleCartById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleDeleteCartById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        productId
    } = req.body;

    const userId = req.user.id;

    const {
        status,
        status_code,
        message,
        data
    } = await cartService.handleDeleteCartById({
        id,
        userId,
        productId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
}

module.exports = {
    handleCreateCart,
    handleGetAllCart,
    handleCartById,
    handleDeleteCartById,
}