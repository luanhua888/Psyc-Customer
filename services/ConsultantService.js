import AbstractService from "./AbstractService";

const API = {
  GET_ALL: "Consultants/Getconsultantbyspecial",
  GET_TYPE: "SpecializationTypes/getallspecype",
  GET_COL_DETAIL: "Consultants/getfeedbackbyid",
  GET_COL_DETAIL1: "Consultants/getbyid",
};

class ConsultantService extends AbstractService {
  getAll = (search) => {
    return this.httpGET(API.GET_ALL, { search });
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
