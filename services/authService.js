const userRepository = require('../repositories/userRepository')
const bycrpt = require('bcrypt')
const jwt = require("jsonwebtoken");
const {
    passwordResetEmail
} = require('../helpers/nodemailer')
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
        userName,
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

            if (!userName) {
                return {
                    status: false,
                    status_code: 400,
                    message: "username harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (userName.length >= 15) {
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
                    userName,
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

    static async handleForgotPassword({
        email,
        otp
    }) {
        try {
            if (!email) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email harus diisi!",
                    data: {
                        forgotPasswordUser: null
                    }
                }
            }

            const getUsersByEmail = await userRepository.handleGetUsersByEmail({
                email: email
            })

            if (!getUsersByEmail) {
                return {
                    status: false,
                    status_code: 400,
                    message: "email tidak valid!",
                    data: {
                        forgotPasswordUser: null
                    }
                }
            } else {
                const emailTemplate = {
                    from: 'e-commerce',
                    to: email,
                    subject: 'konfirmasi Reset Password Akun E-commerce kamu',
                    html: `
                    <body 
                        style="
                            background-color: #F1F6F5;
                        "
                        >
                            <section style="padding: 4% 8%;">
                                
                                <div class="content"
                                    style="
                                    margin: 2% 0 0;
                                    padding:2%; 
                                    justify-content: center;
                                    background-color: #FFFFFF;
                                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                                    height: auto;"
                                >
                                    <h2 
                                        style="
                                        color: #000; 
                                        text-decoration: none; 
                                        list-style: none"
                                    > Halo ${getUsersByEmail.email}, </h2>
                                    
                                    <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                        Untuk mengkonfirmasi permintaan reset password akun Ecommerce kamu, silakan salin OTP di bawah ini.
                                    </p>
                    
                                    <p  class="otp"
                                        style="
                                        text-align: center; 
                                        font-size: 20px;
                                        padding: 2%;
                                        background-color: #000;
                                        color: #FFF;
                                        font-weight: 700;
                                        width: 30%;
                                        display: block;
                                        margin: 0 auto;
                                        border-radius: 5px;"
                                    >
                                        ${otp}
                                    </p>

                                    <p  style="text-align: center; font-size: 16px; color: #000;"> 
                                        Jika kamu tidak meminta reset password, silakan abaikan email ini.
                                    </p>
                                </div>
                            </section>    
                        </body>`
                };

                passwordResetEmail(emailTemplate);

                const sendOTP = await userRepository.handleForgotPassword({
                    email,
                    otp
                });

                return {
                    status: true,
                    status_code: 201,
                    message: 'Kode otp telah dikirim ke email akun anda.',
                    data: {
                        forgotPasswordUser: sendOTP
                    }
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: 'Sumber tidak ada.',
                data: {
                    forgotPasswordUser: null
                }
            }
        }
    };

    static async handleResetPassword({
        password,
        otp
    }) {

        try {
            const validationPasswordUppercas = password.match(upperCaseLetter);
            const validationPasswordNumbers = password.match(numbers);
            const validationPasswordSpacing = password.match(spacing);

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus diisi!",
                    data: {
                        resetPasswordUser: null
                    }
                }
            } else if (password.length < 8) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus minimal harus 8 karakter!",
                    data: {
                        resetPasswordUser: null
                    }
                }
            } else if (!validationPasswordUppercas) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus mengandung huruf kapital!",
                    data: {
                        resetPasswordUser: null
                    }
                }
            } else if (!validationPasswordNumbers) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password harus mengandung angka!",
                    data: {
                        resetPasswordUser: null
                    }
                }
            } else if (validationPasswordSpacing) {
                return {
                    status: false,
                    status_code: 400,
                    message: "password tidak boleh diberi spasi!",
                    data: {
                        resetPasswordUser: null
                    }
                }
            };

            const getuserByOTP = await userRepository.handleGetUsersByOTP({
                otp
            })

            if (getuserByOTP.otp == otp) {
                const hashingPassword = await bycrpt.hash(password, SALT_ROUND);

                const updatePassword = await userRepository.handleResetPassword({
                    otp,
                    password: hashingPassword
                });

                return {
                    status: true,
                    status_code: 201,
                    message: 'password berhasil diubah!',
                    data: {
                        resetPasswordUser: updatePassword
                    }
                }
            } else {
                return {
                    status: false,
                    status_code: 401,
                    message: 'kode otp tidak valid!',
                    data: {
                        resetPasswordUser: null
                    }
                }
            }
        } catch (e) {
            return {
                status: false,
                status_code: 401,
                message: e.message,
                data: {
                    resetPasswordUser: null
                }
            }
        }

    }

};

module.exports = authService;