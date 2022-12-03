import AbstractService from "./AbstractService";

const API = {
  GET_QRCODE: "Deposits/create",
};

class PayMentService extends AbstractService {
  getQrCode1 = (sdt, name, amount) => {
    return this.httpGET(API.GET_QRCODE, {
      sdt: "961449382",
      name: "Trần Trung Tá",
      amount: "10000",
    });
  };

  getQrCode = (customerid, amount) => {
    return this.httpPOST(API.GET_QRCODE, {
    
    },{
        params: {customerid, amount }
      }
    );
  };

  
}

export const payMentService = new PayMentService();
