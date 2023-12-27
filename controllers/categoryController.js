const categoryService = require('../services/categoryService');

const handleCreateCategory = async (req, res) => {
    const {
        categoryName
    } = req.body;

    const userId = req.user.id;
    const userRole = req.user.role;

    const {
        status,
        statuc_code,
        message,
        data
    } = await categoryService.handleCreateCategory({
        categoryName,
        userId,
        userRole
    });

    res.status(statuc_code).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetAllCategory = async (req, res) => {
    const {
        status,
        status_code,
        message,
        data
    } = await categoryService.handleGetAllCategory();

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};

const handleGetCategoryById = async (req, res) => {
    const {
        id
    } = req.params;

    const {
        status,
        status_code,
        message,
        data
    } = await categoryService.handleGetCategoryById({
        id
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};

const handleDeleteCategoryById = async (req, res) => {
    const {
        id
    } = req.params;

    const userId = req.user.id
    const userRole = req.user.role

    const {
        status,
        status_code,
        message,
        data
    } = await categoryService.handleDeleteCategoryById({
        id,
        userId,
        userRole
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};

const handleUpdateCategoryById = async (req, res) => {
    const {
        categoryName
    } = req.body;

    const {
        id
    } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;


    const {
        status,
        status_code,
        message,
        data
    } = await categoryService.handleUpdateCategoryById({
        categoryName,
        id,
        userId,
        userRole
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    })
}

module.exports = {
    handleCreateCategory,
    handleGetAllCategory,
    handleGetCategoryById,
    handleDeleteCategoryById,
    handleUpdateCategoryById
};