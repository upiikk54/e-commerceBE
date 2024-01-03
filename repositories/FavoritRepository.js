const {
    favorits
} = require('../models');

class favoritRepository {
    static async handleCreateFavorit({
        productId,
        userId
    }) {
        const createdFavorit = await favorits.create({
            productId,
            userId
        });

        return createdFavorit;
    };

    static async handleGetAllFavorit() {
        const getAllDataFavorit = await favorits.findAll();

        return getAllDataFavorit;
    };

    static async handleGetFavoritById({
        id
    }) {
        const getDataFavoritById = await favorits.findOne({
            where: {
                id
            }
        });

        return getDataFavoritById;
    };

    static async handleDeleteFavorits({
        id
    }) {
        const deleteFavorits = await favorits.destroy({
            where: {
                id
            }
        });

        return deleteFavorits;
    };
};

module.exports = favoritRepository;