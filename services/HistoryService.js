import AbstractService from "./AbstractService";

const API = {
  GET_APPOINTMENT: "SlotBookings/GetAppointmentByCustomerid",
  GET_HISTORY: "SlotBookings/GetHistoryByCustomerid",
};

class HistoryService extends AbstractService {
  getAppointmentBooking = (customerid) => {
    return this.httpGET(API.GET_APPOINTMENT, { 
      customerid
});
  };

  // api/SlotBookings/GetHistoryByCustomerid?pagesize=5&pagenumber=2
  getHistoryBooking = (customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_HISTORY, { 
      customerid,
      pagesize,
      pagenumber
});
  }
}

export const historyService = new HistoryService();
