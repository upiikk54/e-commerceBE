const {
    carts,
    users,
    products
} = require('../models');

class cartRepository {
    static async handleCreateCart({
        productId,
        userId,
        quantity,
        productStock,
        id,
    }) {
        const createdCart = await carts.create({
            productId,
            userId,
            quantity
        });

        await products.update({
            productStock
        }, {
            where: {
                id
            }
        });

        return createdCart;
    };

    static async handleGetAllCart() {
        const getDataAllCart = await carts.findAll({
            include: [{
                    model: users,
                    attributes: ['userName', 'role']
                },
                {
                    model: products,
                    attributes: ['nameProduct', 'productDescription', 'productPrice', 'productStock', 'image']
                }
            ]
        });

        return getDataAllCart;
    };

    static async handleCartById({
        id
    }) {
        const getDataCartById = await carts.findOne({
            where: {
                id
            }
        });

        return getDataCartById;
    };

    static async handleDeleteCartById({
        id,
        productStock,
        productId
    }) {
        const deletedCart = await carts.destroy({
            where: {
                id
            }
        });

        await products.update({
            productStock
        }, {
            where: {
                id: productId
            }
        })

        return deletedCart;
    }
};

module.exports = cartRepository;