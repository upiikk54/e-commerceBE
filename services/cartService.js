const cartRepository = require('../repositories/cartRepository');
const productRepository = require('../repositories/productRepository');

class cartService {
    static async handleCreateCart({
        productId,
        userId,
        quantity,
        productStock,
        id
    }) {
        try {
            if (!quantity) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'jumlah produk harus diisi!',
                    data: {
                        create_cart: null
                    }
                };
            };

            if (!productId) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'produk harus diisi!',
                    data: {
                        create_cart: null
                    }
                };
            };

            const getProductById = await productRepository.handleGetProductById({
                id: productId
            });

            if (getProductById.productStock == 0) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'stock produk habis!',
                    data: {
                        create_cart: null
                    }
                };
            } else if (getProductById.productStock < quantity) {
                return {
                    status: false,
                    status_code: 400,
                    message: `stock produk melebihi stock! sisa produk tinggal ${getProductById.productStock}`,
                    data: {
                        create_cart: null
                    }
                };
            } else {
                const productStock = getProductById.productStock - quantity;
                const createdCart = await cartRepository.handleCreateCart({
                    productId,
                    userId,
                    quantity,
                    productStock,
                    id: productId
                })

                return {
                    status: true,
                    status_code: 201,
                    message: 'produk telah masuk ke keranjang!',
                    data: {
                        create_cart: createdCart
                    }
                };
            };

        } catch (e) {
            return {
                status: false,
                status_code: 500,
                message: e.message,
                data: {
                    create_cart: null
                }
            };
        };
    };

    static async handleGetAllCart() {
        try {
            const getDataAllCart = await cartRepository.handleGetAllCart();

            return {
                status: true,
                status_code: 202,
                message: 'keranjang berhasil ditampilkan!',
                data: {
                    get_all_data_cart: getDataAllCart
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 500,
                message: e.message,
                data: {
                    get_all_data_cart: null
                }
            }
        }
    };

    static async handleCartById({
        id
    }) {
        try {
            const getDataCartById = await cartRepository.handleCartById({
                id
            });

            return {
                status: true,
                status_code: 202,
                message: 'keranjang berhasil ditampilkan!',
                data: {
                    get_cart_by_id: getDataCartById
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 500,
                message: e.message,
                data: {
                    get_cart_by_id: null
                }
            }
        }
    };

    static async handleDeleteCartById({
        id,
        userId,
        productId,
        productStock
    }) {
        try {
            const getDataCartById = await cartRepository.handleCartById({
                id
            });

            const getDataProductById = await productRepository.handleGetProductById({
                id: productId
            });

            if (getDataCartById.userId == userId) {
                const productStock = getDataProductById.productStock + getDataCartById.quantity
                const deletedCart = await cartRepository.handleDeleteCartById({
                    id,
                    productId,
                    productStock
                });

                return {
                    status: true,
                    status_code: 200,
                    message: 'berhasil menghapus dari keranjang!',
                    data: {
                        delete_cart: deletedCart
                    }
                };
            };
        } catch (e) {
            return {
                status: false,
                status_code: 500,
                message: e.message,
                data: {
                    delete_cart: null
                }
            };
        };
    }
};

module.exports = cartService;