import AbstractService from "./AbstractService";

const API = {
  GET_ALL: "Consultants/Getconsultantbyspecial",
  GET_TYPE: "SpecializationTypes/getallspecype",
};

class ConsultantService extends AbstractService {
  getAll = (search) => {
    return this.httpGET(API.GET_ALL, { search });
  };

  getTypeConsultant = (search) => {
    return this.httpGET(API.GET_TYPE);
  };
}

export const consultantService = new ConsultantService();
