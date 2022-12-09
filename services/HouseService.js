import AbstractService from "./AbstractService";

const API = {
  GET_ALL: "Houses/Getallhouses",
  DETAIL_Houses: "Houses/getbyid",
};

class HouseService extends AbstractService {
  getAll = (search) => {
    return this.httpGET(API.GET_ALL, { search });
  };

  detailHouse = (id) => {
    return this.httpGET(
      API.DETAIL_Houses,
      { id },
      {
        params: {
          id: id,
        },
      }
    );
  };
}

export const houseService = new HouseService();
