const authService = require('../services/authService')

const handleRegister = async (req, res) => {
    const {
        user_name,
        email,
        password,
        role
    } = req.body

    const {
        status,
        status_code,
        message,
        data
    } = await authService.handleRegister({
        user_name,
        email,
        password,
        role
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};
const handleLogin = async (req, res) => {
    const {
        email,
        password,
    } = req.body

    const {
        status,
        status_code,
        message,
        data
    } = await authService.handleLogin({
        email,
        password,
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data
    });
};

const currentUser = async ( req, res) => {
    const currentUser = req.user;

    res.status(200).send({
        status: true,
        message: 'berhasil menampilkan data user',
        data: {
            user: currentUser
        }
    })
}

module.exports = {
    handleRegister,
    handleLogin,
    currentUser
}