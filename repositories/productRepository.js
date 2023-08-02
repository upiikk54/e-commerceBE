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

    static async handleGetAllProduct() {
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