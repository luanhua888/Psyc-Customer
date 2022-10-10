import AbstractService from './AbstractService';

const API = {
    PROFILE: 'Users/getbyid',
};

class ProfileService extends AbstractService {
    profile = (id) => {
        return this.httpGET(API.PROFILE, { id });
    };
}

export const profileService = new ProfileService();

