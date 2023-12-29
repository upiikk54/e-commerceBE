const productRepository = require('../repositories/productRepository');
const cloudinary = require("../utils/cloudinary");

class productService {
    static async handleCreateProduct({
        nameProduct,
        productDescription,
        image,
        productPrice,
        productStock,
        categoryId,
        userId,
        userRole
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

            if (userRole !== 'admin') {
                return {
                    status: false,
                    status_code: 401,
                    message: 'Hanya admin yang dapat membuat produk!',
                    data: {
                        create_product: null
                    }
                };
            };

            const images = [];

            await Promise.all(image.image.map(async (img) => {
                const fileBase64 = img.buffer.toString("base64");
                const file = `data:${img.mimetype};base64,${fileBase64}`;
                const cloudinaryImage = await cloudinary.uploader.upload(file);
                images.push(cloudinaryImage.url);
            }));

            const createdProduct = await productRepository.handleCreateProduct({
                nameProduct,
                productDescription,
                image: images,
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

    static async handleGetAllProduct({
        nameProduct,
        productPrice
    }) {
        try {
            const getDataAllProduct = await productRepository.handleGetAllProduct({
                nameProduct,
                productPrice
            });

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
        image,
        productPrice,
        productStock,
        categoryId,
        userId,
        userRole,
        id
    }) {
        try {
            const getDataProductById = await productRepository.handleGetProductById({
                id
            });
            if (userRole !== 'admin') {
                return {
                    status: false,
                    status_code: 401,
                    message: 'Hanya admin yang dapat membuat product!',
                    data: {
                        update_product: null
                    }
                }
            };

            if (getDataProductById.userId == userId) {

                let images = [];

                if (image.image) {
                    await Promise.all(image.image.map(async (img) => {
                        const fileBase64 = img.buffer.toString("base64");
                        const file = `data:${img.mimetype};base64,${fileBase64}`;
                        const cloudinaryImage = await cloudinary.uploader.upload(file);
                        images.push(cloudinaryImage.url);
                    }))
                } else {
                    images = getDataProductById.image
                }

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
                    image: images,
                    productPrice,
                    productStock,
                    categoryId,
                    userId,
                    id
                })

                return {
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
    };

    static async handleDeleteProductById({
        id,
        userId,
        userRole
    }) {
        try {
            const getDataProductById = await productRepository.handleGetProductById({
                id
            });

            if (userRole !== 'admin') {
                return {
                    status: false,
                    status_code: 401,
                    message: 'Hanya admin yang dapat menghapus produk!',
                    data: {
                        delete_product: null
                    }
                }
            };

            if (getDataProductById.userId == userId) {
                const deletedDataProduct = await productRepository.handleDeleteProductById({
                    id
                })

                return {
                    status: true,
                    status_code: 202,
                    message: 'produk berhasil dihapus!',
                    data: {
                        delete_product: deletedDataProduct
                    }
                }
            } else {
                return {
                    status: false,
                    status_code: 400,
                    message: 'silahkan menggunakan akun anda yang membuat data ini!',
                    data: {
                        delete_product: null
                    }
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    delete_product: null
                }
            }
        }
    };
};

module.exports = productService;