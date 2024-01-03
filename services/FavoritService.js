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

    static async handleDeleteFavorits({
        id,
        userId
    }) {
        try {

            const getFavoritById = await favoritRepository.handleGetFavoritById({
                id
            });

            if (getFavoritById.userId == userId) {
                const deleteFavorits = await favoritRepository.handleDeleteFavorits({
                    id
                })

                return {
                    status: true,
                    status_code: 201,
                    message: 'Favorit berhasil dihapus!',
                    data: {
                        delete_favorit: deleteFavorits
                    }
                }
            }else {
                return {
                    status: false,
                    status_code: 401,
                    message: 'silahkan menggunakan akun anda yang memfavoritkan produk ini!',
                    data: {
                        delete_favorit: null
                    }
                };
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    delete_favorit: null
                }
            };
        };
    };
};

module.exports = favoritService;