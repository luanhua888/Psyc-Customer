import AbstractService from "./AbstractService";

const API = {
  GET_APPOINTMENT: "SlotBookings/GetAppointmentByCustomerid",
  GET_HISTORY: "SlotBookings/GetHistoryByCustomerid",
  PUT_CANCELBOOKING: "SlotBookings/cancelbyconsultant",
};

class HistoryService extends AbstractService {
  getAppointmentBooking = (customerid) => {
    return this.httpGET(API.GET_APPOINTMENT, {
      customerid,
    });
  };

  // api/SlotBookings/GetHistoryByCustomerid?pagesize=5&pagenumber=2
  getHistoryBooking = (customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_HISTORY, {
      customerid,
      pagesize,
      pagenumber,
    });
  };

  getRoomAgrora = (customerid) => {
    return this.httpGET(API.GET_HISTORY, {
      customerid,
    });
  };

  putCanelBooking = (id, reason) => {
    return this.httpPUT(
      API.PUT_CANCELBOOKING,
      {},
      {
        params: { id: 88, reason },
      }
    );
  };
}
export const historyService = new HistoryService();
