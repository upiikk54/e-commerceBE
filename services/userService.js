const userRepository = require('../repositories/userRepository');

class userService {
    static async handleGetCartByUserId({
        id
    }) {
        try {
            const getDataCartByUserId = await userRepository.handleGetCartByUserId({
                id
            });

            return {
                status: true,
                status_code: 202,
                message: 'keranjang berhasil ditampilkan!',
                data: {
                    get_data_cart_by_user_id: getDataCartByUserId
                }
            };
        } catch (e) {
            return {
                status: false,
                status_code: 500,
                message: e.message,
                data: {
                    get_data_cart_by_user_id: null
                }
            };
        };
    };
};

module.exports = userService;