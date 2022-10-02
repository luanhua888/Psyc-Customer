import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'Zodiacs/Getallzodiacs',
};

class ZodiacService extends AbstractService {
    getAll = (search) => {
        return this.httpGET(API.GET_ALL, { search });
    };
}

export const zodiacService = new ZodiacService();
