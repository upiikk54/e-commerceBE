const {
    categorys,
    users
} = require('../models');

class categoryRepository {
    static async handleCreateCategory({
        userId,
        categoryName
    }) {
        const categoryData = await categorys.create({
            categoryName,
            userId
        });

        return categoryData;
    };

    static async handleGetAllCategory() {
        const categoryAllData = await categorys.findAll({
            include: [{
                model: users,
                attributes: ['userName', 'role']
            }]
        });

        return categoryAllData;
    };

    static async handleGetCategoryById({
        id
    }) {
        const getCategoryByIdData = await categorys.findOne({
            where: {
                id
            },
            include: [{
                model: users,
                attributes: ['userName', 'role']
            }]
        });

        return getCategoryByIdData;
    };

    static async handleDeleteCategoryById({
        id
    }) {
        const deleteCategory = await categorys.destroy({
            where: {
                id
            }
        });

        return deleteCategory;
    };

    static async handleUpdateCategoryById({
        categoryName,
        id
    }) {
        const updateCategory = await categorys.update({
            categoryName
        }, {
            where: {
                id
            }
        });

        return updateCategory;
    };
};

module.exports = categoryRepository;