const favoritService = require('../services/favoritService');

const handleCreateFavorit = async (req, res) => {
    const {
        productId
    } = req.body;

    const userId = req.user.id;

    const {
        status,
        status_code,
        message,
        data
    } = await favoritService.handleCreateFavorit({
        productId,
        userId
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}



module.exports = {
    handleCreateFavorit
};