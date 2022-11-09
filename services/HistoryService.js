import AbstractService from "./AbstractService";

const API = {
  GET_APPOINTMENT: "SlotBookings/GetAppointmentByCustomerid",
  GET_HISTORY: "SlotBookings/GetHistoryByCustomerid",
  PUT_CANCELBOOKING: "SlotBookings/cancelbyconsultant",
};

class HistoryService extends AbstractService {
  getAppointmentBooking = (date, customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_APPOINTMENT, {
      date,
      customerid,
      pagesize,
      pagenumber,
    });
  };
  getAppointmentBookingDefault = (date, customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_APPOINTMENT, {
      date,
      customerid,
      pagesize: 5,
      pagenumber: 1,
    });
  };

  // api/SlotBookings/GetHistoryByCustomerid?pagesize=5&pagenumber=2
  getHistoryBooking = (date, customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_HISTORY, {
      date,
      customerid,
      pagesize,
      pagenumber,
    });
  };

  getHistoryBookingDefault = (date, customerid, pagesize, pagenumber) => {
    return this.httpGET(API.GET_HISTORY, {
      date,
      customerid,
      pagesize: 5,
      pagenumber: 1,
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
        params: { id, reason },
      }
    );
  };
}
export const historyService = new HistoryService();
