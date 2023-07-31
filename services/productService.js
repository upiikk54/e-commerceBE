const productRepository = require('../repositories/productRepository');

class productService {
    static async handleCreateProduct({
        nameProduct,
        productDescription,
        productPrice,
        productStock,
        categoryId,
        userId
    }) {
        try {
            if (!nameProduct) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'nama produk harus diisi!',
                    data: {
                        create_product: null
                    }
                }
            };
            if (!productDescription) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'deskripsi produk harus diisi!',
                    data: {
                        create_product: null
                    }
                }
            };
            if (!productPrice) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'harga produk harus diisi!',
                    data: {
                        create_product: null
                    }
                }
            };
            if (!productStock) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'stok produk harus diisi!',
                    data: {
                        create_product: null
                    }
                }
            };
            if (!categoryId) {
                return {
                    status: false,
                    status_code: 400,
                    message: 'kategori harus diisi!',
                    data: {
                        create_product: null
                    }
                }
            };

            const createdProduct = await productRepository.handleCreateProduct({
                nameProduct,
                productDescription,
                productPrice,
                productStock,
                categoryId,
                userId
            });

            return {
                status: true,
                status_code: 201,
                message: 'product berhasil dibuat',
                data: {
                    create_product: createdProduct
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    create_product: null
                }
            }
        }
    };

    static async handleGetAllProduct() {
        try {
            const getDataAllProduct = await productRepository.handleGetAllProduct();

            return {
                status: true,
                status_code: 202,
                message: 'produk berhasil ditampilkan!',
                data: {
                    get_all_data_product: getDataAllProduct
                }
            };
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    get_all_data_product: null
                }
            };
        }
    };

    static async handleGetProductById({
        id
    }) {
        try {
            const getDataProductById = await productRepository.handleGetProductById({
                id
            })
            return {
                status: true,
                status_code: 202,
                message: 'produk berhasil ditampilkan!',
                data: {
                    get_data_product_by_id: getDataProductById
                }
            };
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    get_data_product_by_id: null
                }
            };
        }
    };

    static async handleUpdateProductById({
        nameProduct,
        productDescription,
        productPrice,
        productStock,
        categoryId,
        userId,
        id
    }) {
        try {
            const getDataProductById = await productRepository.handleGetProductById({
                id
            });

            if (getDataProductById.userId == userId) {
                if (!nameProduct) {
                    nameProduct = getDataProductById.nameProduct
                }
                if (!productDescription) {
                    productDescription = getDataProductById.productDescription
                }
                if (!productPrice) {
                    productPrice = getDataProductById.productPrice
                }
                if (!productStock) {
                    productStock = getDataProductById.productStock
                }
                if (!categoryId) {
                    categoryId = getDataProductById.categoryId
                }

                const updatedProduct = await productRepository.handleUpdateProductById({
                    nameProduct,
                    productDescription,
                    productPrice,
                    productStock,
                    categoryId,
                    userId,
                    id
                })

                return{
                    status: true,
                    status_code: 202,
                    message: 'produk berhasil di edit!',
                    data: {
                        update_product: updatedProduct
                    }
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    update_product: null
                }
            }
        }
    }
};

module.exports = productService;