const {
    users,
    carts
} = require('../models')

class userRepository {
    static async handleGetUsersByEmail({
        email
    }) {
        const dataUsersByEmail = await users.findOne({
            where: {
                email: email
            }
        });

        return dataUsersByEmail;
    };

    static async handleGetUsersByOTP({
        otp
    }) {
        const dataUsersByOTP = await users.findOne({
            where: {
                otp
            }
        });

        return dataUsersByOTP;
    };

    static async handleRegister({
        userName,
        email,
        password,
        role
    }) {
        const dataRegistered = await users.create({
            userName,
            email,
            password,
            role
        })

        return dataRegistered;
    };

    static async handleForgotPassword({
        email,
        otp
    }) {
        const sendOTP = await users.update({
            otp
        }, {
            where: {
                email
            }
        });

        return sendOTP;
    };

    static async handleResetPassword({
        password,
        otp
    }) {
        const sendOTP = await users.update({
            password,
            otp: null
        }, {
            where: {
                otp
            }
        });

        return sendOTP;
    };

    static async handleGetCartByUserId({
        id
    }) {
        const getDataCartByUserId = await carts.findAll({
            where: {
                userId: id
            }
        });

        return getDataCartByUserId;
    }
}

module.exports = userRepository;