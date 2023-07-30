const otpGenerator = require('otp-generator');

const generateOTP = () => {
    const getOTP = otpGenerator.generate(4, {
        upperCaseAlphabets: true,
        specialChars: true,
        lowerCaseAlphabets: true
    });

    return getOTP;
};

module.exports = {
    generateOTP
};