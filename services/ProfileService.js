import AbstractService from "./AbstractService";

const API = {
  PROFILE: "Customers/getbyid",
  GET_SUPPROFILE: "Profiles/getbyidcustomer",
  DELETE_SUPPROFILE: `Profiles/`,
  GET_LOVECOMPATILITY: "Profiles/lovecompatibility",
};

class ProfileService extends AbstractService {
  profile = (id) => {
    return this.httpGET(API.PROFILE, { id });
  };
  // Profiles/getbyidcustomer?id=8&pagesize=5&pagenumber=1
  getSupProfile = (id, pagesize, pagenumber) => {
    return this.httpGET(API.GET_SUPPROFILE, { id, pagesize, pagenumber });
  };

  getSupProfileDefault = (id, pagesize, pagenumber) => {
    return this.httpGET(API.GET_SUPPROFILE, { id, pagesize: 5, pagenumber: 1 });
  };

  //Profiles/{id}
  // params query string
  deleteSupProfile = (id) => {
    return this.httpDELETE(API.DELETE_SUPPROFILE + id);
  };

  getLovecompatility = (customerid, profileid) => {
    return this.httpGET(API.GET_LOVECOMPATILITY, { customerid, profileid });
  };
}

export const profileService = new ProfileService();
