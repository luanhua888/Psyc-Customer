import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'Articles/Getallarticles',
};

class ArticleService extends AbstractService {
    getAll = (search) => {
        return this.httpGET(API.GET_ALL, { search });
    };
}

export const articleService = new ArticleService();
 