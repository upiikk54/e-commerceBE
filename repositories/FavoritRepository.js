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

    static async getAllFavorit(){
        const getAllDataFavorit = await favorits.findAll();

        return getAllDataFavorit;
    }
};

module.exports = favoritRepository;