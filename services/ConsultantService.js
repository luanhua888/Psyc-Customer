import AbstractService from "./AbstractService";

const API = {
  GET_ALL: "Consultants/Getallconsultant",
  GET_ALL_TYPE: "Consultants/Getconsultantbyspecial",
  GET_TYPE: "SpecializationTypes/getallspecype",
  GET_COL_DETAIL: "Consultants/getfeedbackbyid",
  GET_COL_DETAIL1: "Consultants/getbyidv2",
};

class ConsultantService extends AbstractService {
  getAll = (search) => {
    return this.httpGET(API.GET_ALL, { search });
  };
  
  getTypeConSul = (search) => {
    return this.httpGET(API.GET_ALL_TYPE, { search });
  };



  getTypeConsultant = (search) => {
    return this.httpGET(API.GET_TYPE);
  };

  getConsultantDetail = (id) => {
    return this.httpGET(API.GET_COL_DETAIL, { id });
  }

  getConsultantDetail1 = (id) => {
    return this.httpGET(API.GET_COL_DETAIL1, { id });
  }

  


}

export const consultantService = new ConsultantService();
