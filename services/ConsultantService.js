import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'Consultants/Getallconsultant',
};

class ConsultantService extends AbstractService {
    getAll = () => {
        return this.httpGET(API.GET_ALL);
    };
}

export const consultantService = new ConsultantService();
