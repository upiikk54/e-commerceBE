const jwt = require("jsonwebtoken");
const JWT = require('../libs/const');
const userRepository = require('../repositories/userRepository');

const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');

    let token = "";

    if (authHeader && authHeader.startsWith("Bearer"))
        token = authHeader.split(" ")[1];

    else
        return res.status(status_code).send({
            status: false,
            message: "kamu harus login untuk mengakses fitur ini",
            data: null
        });

    try {
        const {
            email
        } = jwt.verify(token, JWT.JWT.SECRET);

        const handleGetUsersByEmail = await userRepository.handleGetUsersByEmail({
            email
        })

        req.user = handleGetUsersByEmail;
        next();
    } catch (e) {
        return res.status(401).send({
            status: false,
            message: "sesi telah kadaluwarsa silahkan login kembali",
            data: null
        });
    };
};

module.exports = {
    authenticate
}