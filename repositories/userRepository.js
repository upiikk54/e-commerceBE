const {
    users
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

    static async handleRegister({
        user_name,
        email,
        password,
        role
    }) {
        const dataRegistered = await users.create({
            user_name,
            email,
            password,
            role
        })

        return dataRegistered;
    }
}

module.exports = userRepository;