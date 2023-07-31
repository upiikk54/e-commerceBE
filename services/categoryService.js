const categoryRepository = require('../repositories/categoryRepository');

class categoryService {
    static async handleCreateCategory({
        categoryName,
        userId
    }) {
        try {
            if (!categoryName) {
                return {
                    status: false,
                    statuc_code: 400,
                    message: 'Nama kategori harus diisi!',
                    data: {
                        createCategory: null
                    }
                };
            };

            const createdCategory = await categoryRepository.handleCreateCategory({
                userId,
                categoryName
            });

            return {
                status: true,
                statuc_code: 201,
                message: 'Kategori berhasil dibuat!',
                data: {
                    createCategory: createdCategory
                }
            };
        } catch (e) {
            return {
                status: false,
                statuc_code: 401,
                message: e.message,
                data: {
                    createCategory: null
                }
            };
        };
    };

    static async handleGetAllCategory() {
        try {
            const getAllCategoryData = await categoryRepository.handleGetAllCategory();

            return {
                status: true,
                status_code: 200,
                message: 'data kategori berhasil ditampilkan',
                data: {
                    getAllCategory: getAllCategoryData
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    getAllCategory: null
                }
            }
        }
    };

    static async handleGetCategoryById({
        id
    }) {
        try {
            const getCategoryByIdData = await categoryRepository.handleGetCategoryById({
                id
            })
            return {
                status: true,
                status_code: 201,
                message: 'kategori berhasil ditampilkan!',
                data: {
                    get_category_by_id: getCategoryByIdData
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    get_category_by_id: null
                }
            }
        }
    };

    static async handleDeleteCategoryById({
        id,
        userId
    }) {
        try {
            const getCategoryByIdData = await categoryRepository.handleGetCategoryById({
                id
            })

            if (getCategoryByIdData.userId == userId) {
                const deleteCategory = await categoryRepository.handleDeleteCategoryById({
                    id
                })

                return {
                    status: true,
                    status_code: 202,
                    message: 'kategori berhasil dihapus!',
                    data: {
                        delete_category: deleteCategory
                    }
                };
            };
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    delete_category: null
                }
            };
        }
    };

    static async handleUpdateCategoryById({
        id,
        categoryName,
        userId
    }) {
        try {
            const getCategoryByIdData = await categoryRepository.handleGetCategoryById({
                id
            })

            if (getCategoryByIdData.userId == userId) {

                if (!categoryName) {
                    categoryName = getCategoryByIdData.categoryName
                };

                const updateCategoryById = await categoryRepository.handleUpdateCategoryById({
                    id,
                    categoryName
                });

                return {
                    status: true,
                    status_code: 202,
                    message: 'kategori berhasil di edit!',
                    data: {
                        update_category: updateCategoryById
                    }
                };
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    update_category: null
                }
            };
        }
    }
};

module.exports = categoryService;