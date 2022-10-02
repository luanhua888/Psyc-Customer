import AbstractService from './AbstractService';

const API = {
    LOGIN: 'FirebaseServices/loginapp',
    PROFILE: 'Users/getbyid',
};

class UserService extends AbstractService {
    login = (username, password) => {
        return this.httpPOST(API.LOGIN, {
            userName: username,
            passWord: password,
        });
    };

    profile = (id) => {
        return this.httpGET(API.PROFILE, { id });
    };
}

export const userService = new UserService();
