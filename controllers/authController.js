const authService = require('../services/authService')
const {
    generateOTP
} = require('../helpers/otpGenerator')
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

const currentUser = async (req, res) => {
    const currentUser = req.user;

    res.status(200).send({
        status: true,
        message: 'berhasil menampilkan data user',
        data: {
            user: currentUser
        }
    })
};

const handleForgotPassword = async (req, res) => {
    const {
        email
    } = req.body

    const {
        status,
        status_code,
        message,
        data
    } = await authService.handleForgotPassword({
        email,
        otp: generateOTP()
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    })
}

const handleResetPassword = async (req, res) => {
    const {
        password,
        otp
    } = req.body

    const {
        status,
        status_code,
        message,
        data
    } = await authService.handleResetPassword({
        password,
        otp
    });

    res.status(status_code).send({
        status: status,
        message: message,
        data: data,
    })
}

module.exports = {
    handleRegister,
    handleLogin,
    currentUser,
    handleForgotPassword,
    handleResetPassword
}