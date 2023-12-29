const {
    Op
} = require('sequelize');
const {
    products,
    users,
    categorys
} = require('../models')

class productRepository {
    static async handleCreateProduct({
        nameProduct,
        productDescription,
        image,
        productPrice,
        productStock,
        categoryId,
        userId
    }) {
        const createdProduct = await products.create({
            nameProduct,
            productDescription,
            image,
            productPrice,
            productStock,
            categoryId,
            userId
        });

        return createdProduct;
    };

    static async handleGetAllProduct({
        nameProduct,
        productPrice
    }) {

        const getDataAllProduct = await products.findAll({
            include: [{
                    model: users,
                    atrributes: ['userName', 'role']
                },
                {
                    model: categorys,
                    atrributes: ['categoryName']
                }
            ]
        })

        if (nameProduct) {
            const searchByName = await products.findAll({
                where: {
                    [Op.or]: [{
                        nameProduct: {
                            [Op.like]: '%' + nameProduct + '%'
                        }
                    }, ]
                },
                limit: 10,
            });

            return searchByName;
        }

        if (productPrice) {
            const searchByPrice = await products.findAll({
                where: {
                    productPrice: {
                        [Op.gte]: productPrice
                    }
                }
            });

            return searchByPrice;
        }


        return getDataAllProduct;
    };

    static async handleGetProductById({
        id
    }) {
        const getDataProductById = await products.findOne({
            where: {
                id
            }
        });

        return getDataProductById;
    };

    static async handleUpdateProductById({
        nameProduct,
        productDescription,
        image,
        productPrice,
        productStock,
        categoryId,
        id
    }) {
        const updateDataProduct = await products.update({
            nameProduct,
            productDescription,
            image,
            productPrice,
            productStock,
            categoryId
        }, {
            where: {
                id
            }
        });

        return updateDataProduct;
    };

    static async handleDeleteProductById({
        id
    }) {
        const deletedDataProduct = await products.destroy({
            where: {
                id
            }
        });
        return deletedDataProduct;
    };
};

module.exports = productRepository;