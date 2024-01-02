const favoritRepository = require('../repositories/favoritRepository');

class favoritService {
    static async handleCreateFavorit({
        productId,
        userId
    }) {
        try {
            const createdFavorit = await favoritRepository.handleCreateFavorit({
                productId,
                userId
            })

            return {
                status: true,
                status_code: 201,
                message: 'Berhasil ditambahkan ke favorit saya!',
                data: {
                    created_favorit: createdFavorit
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    created_favorit: null
                }
            };
        };
    };
};

module.exports = favoritService;