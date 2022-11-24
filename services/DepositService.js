import AbstractService from "./AbstractService";

const API = {
  GET_ALLDEPOSIT: "Deposits/historydeposit",
  GET_ALLWITHDRAWAL: "Withdrawals/historywithdrawal",
};

class DepositService extends AbstractService {
  getAllDeposit = (customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_ALLDEPOSIT, {
      customerid,
      pagesize,
      pagenumber,
    });
  };

  getAllDepositDefault = (customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_ALLDEPOSIT, {
      customerid,
      pagesize: 5,
      pagenumber: 1,
    });
  };
  
  getAllWithdrawal = (customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_ALLWITHDRAWAL, {
      customerid,
      pagesize,
      pagenumber,
    });
  };

  getAllDepositWithdrawal = (customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_ALLWITHDRAWAL, {
      customerid,
      pagesize: 5,
      pagenumber: 1,
    });
  };


  getDepositByDate  = (code, date, pagesize = 5, pagenumber = 1) => {
    return this.httpGET(API.GET_ALLDEPOSIT, {
      code,
      date,
      pagesize,
      pagenumber,
    });
  }
}

export const depositService = new DepositService();
