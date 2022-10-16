import AbstractService from './AbstractService';

const API = {
    PROFILE: 'Customers/Getallcustomer',
    GET_SUPPROFILE: 'Profiles/getbyidcustomer',

};

class ProfileService extends AbstractService {
    profile = (id) => {
        return this.httpGET(API.PROFILE, { id });
    };

    getAllSupProfile = (id, page=1) => {
        return this.httpGET(API.GET_SUPPROFILE, { id, page });
    };
}

export const profileService = new ProfileService();

