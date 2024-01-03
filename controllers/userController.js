const userService = require('../services/userService');

const handleGetCartByUserId = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        status_code,
        message,
        data
    } = await userService.handleGetCartByUserId({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    });
};

const handleGetFavoritByUserId = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        status_code,
        message,
        data
    } = await userService.handleGetFavoritByUserId({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};

module.exports = {
    handleGetCartByUserId,
    handleGetFavoritByUserId
}