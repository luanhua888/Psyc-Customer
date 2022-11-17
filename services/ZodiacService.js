import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'Zodiacs/Getallzodiacs',
    DETAIL_ZODIAC: 'Zodiacs/getbyid',
};

class ZodiacService extends AbstractService {
    getAll = (search) => {
        return this.httpGET(API.GET_ALL, { search });
    };
    
    detailZodiac = (id) => {
        return this.httpGET(API.DETAIL_ZODIAC, { id });
    };
}

export const zodiacService = new ZodiacService();
