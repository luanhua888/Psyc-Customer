import AbstractService from './AbstractService';

const API = {
    LOGIN: 'FirebaseServices/loginapp',
    REGISTER: 'Users/createcustomer',
    REGISTER_INFOR: 'Customers/update',
    REGISTER_RESEND_CODE: 'register/resend',
    REGISTER_CHECK_BY_EMAIL: 'Users/checkbyemail',
    REGISTER_CONFIRM: 'register/confirm',
    CHANGE_PASSWORD: 'register/change-pass',
    PROFILE: 'Users/getbyid',
};

class UserService extends AbstractService {
    login = (username, password) => {
        return this.httpPOST(API.LOGIN, {
            userName: username,
            passWord: password,
        });
    };

    register = (username, email, password) => {
        return this.httpPOST(API.REGISTER, {
            userName: username,
            email: email,
            passWord: password,
        });
    };

    registerInfor = (fullname, email) => {
        return this.httpPUT(API.REGISTER_INFOR, {
            fullName: fullname,
            email: email,
        });
    };

    registerResendCode = (email) => {
        return this.httpPOST(
            API.REGISTER_RESEND_CODE,
            {},
            {
                params: {
                    email,
                },
            }
        );
    };

    registerConfirm = (email, code) => {
        return this.httpPUT(API.CHANGE_PASSWORD, {
            email,
            code,
        });
    };

    changePassword = (email, code, password) => {
        return this.httpPUT(API.CHANGE_PASSWORD, {
            email,
            code: `${code}`,
            passWord: password,
        });
    };

    registerCheckByEmail = (email) => {
        return this.httpGET(API.REGISTER_CHECK_BY_EMAIL, { email });
    };

    profile = (id) => {
        return this.httpGET(API.PROFILE, { id });
    };
}

export const userService = new UserService();
