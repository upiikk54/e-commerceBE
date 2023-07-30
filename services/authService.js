const userRepository = require('../repositories/userRepository')
const bycrpt = require('bcrypt')
const jwt = require("jsonwebtoken");
const {
    JWT
} = require('../libs/const');
const SALT_ROUND = 10;
const upperCaseLetter = /[A-Z]/g;
const numbers = /[0-9]/g;
const addEmail = /[@]/g;
const dotEmail = /[.]/g;
const spacing = /[\s]/g;

class authService {
    static async handleRegister({
        user_name,
        email,
        password,
        role
    }) {
        try {
            const validationPasswordUppercas = password.match(upperCaseLetter);
            const validationPasswordNumbers = password.match(numbers);
            const validationPasswordSpacing = password.match(spacing);
            const validationAddEmail = email.match(addEmail);
            const validationDotEmail = email.match(dotEmail);

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationAddEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email harus mengandung @",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationDotEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email harus mengandung titik",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!role) {
                return {
                    status: false,
                    status_code: 400,
                    message: "role harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!user_name) {
                return {
                    status: false,
                    status_code: 400,
                    message: "username harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (user_name.length >= 15) {
                return {
                    status: false,
                    status_code: 400,
                    message: "username maksimal 15 karakter",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus minimal harus 8 karakter!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationPasswordUppercas) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus mengandung huruf kapital!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationPasswordNumbers) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus mengandung angka!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (validationPasswordSpacing) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password tidak boleh diberi spasi!",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            const getUsersByEmail = await userRepository.handleGetUsersByEmail({
                email
            });

            if (getUsersByEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email sudah terdaftar",
                    data: {
                        registeredUsers: null
                    }
                }
            } else {
                const hashingPassword = await bycrpt.hash(password, SALT_ROUND);
                const registeredUser = await userRepository.handleRegister({
                    user_name,
                    email,
                    password: hashingPassword,
                    role
                });

                return {
                    status: true,
                    status_code: 201,
                    message: "akun berhasil dibuat!",
                    data: {
                        registeredUsers: registeredUser
                    }
                };
            };

        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    registeredUsers: null
                }
            };
        };
    };

    static async handleLogin({
        email,
        password,
    }) {
        try {
            const validationPasswordUppercas = password.match(upperCaseLetter);
            const validationPasswordNumbers = password.match(numbers);
            const validationPasswordSpacing = password.match(spacing);
            const validationAddEmail = email.match(addEmail);
            const validationDotEmail = email.match(dotEmail);

            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationAddEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email harus mengandung @",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationDotEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email harus mengandung titik",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus minimal harus 8 karakter!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationPasswordUppercas) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus mengandung huruf kapital!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationPasswordNumbers) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus mengandung angka!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (validationPasswordSpacing) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password tidak boleh diberi spasi!",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            const getUsersByEmail = await userRepository.handleGetUsersByEmail({
                email
            });

            if (!getUsersByEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email belum terdaftar",
                    data: {
                        registeredUsers: null
                    }
                }
            } else {
                const passwordMatching = await bycrpt.compare(password, getUsersByEmail.password);

                if (passwordMatching) {
                    const token = jwt.sign({
                        id: getUsersByEmail.id,
                        email: getUsersByEmail.email
                    }, JWT.SECRET, {
                        expiresIn: JWT.EXPIRED,
                    });
                    return {
                        status: true,
                        status_code: 200,
                        message: "pengguna berhasil masuk!",
                        data: {
                            token,
                        }
                    }
                } else {
                    return {
                        status: false,
                        status_code: 201,
                        message: "email atau password salah!",
                        data: {
                            registeredUsers: null
                        }
                    };
                }

                
            };

        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    registeredUsers: null
                }
            };
        };
    };
};

module.exports = authService;