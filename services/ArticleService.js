import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'Articles/Getallarticles',
    DETAIL_ARTICLE: 'Articles/getbyid',
};

class ArticleService extends AbstractService {
    getAll = (search) => {
        return this.httpGET(API.GET_ALL, { search });
    };


    detailArticle = (id) => {
        return this.httpGET(API.DETAIL_ARTICLE, { id:7 });
    };




}

export const articleService = new ArticleService();
 