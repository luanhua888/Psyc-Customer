import AbstractService from "./AbstractService";

const API = {
  PROFILE: "Customers/Getallcustomer",
  GET_SUPPROFILE: "Profiles/getbyidcustomer",
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
}

export const profileService = new ProfileService();
