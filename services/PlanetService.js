import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'Planets/Getallplanets',
    DETAIL_PLANET: 'Planets/getbyid',
};

class PlanetService extends AbstractService {
    getAll = (search) => {
        return this.httpGET(API.GET_ALL, { search });
    };


    detailPlanet = (id) => {
        return this.httpGET(API.DETAIL_PLANET, {id}, {
            params: {
                id: id,
            }
        });
    };




}

export const planetService = new PlanetService();
 