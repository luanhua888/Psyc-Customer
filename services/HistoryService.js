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

  getHistoryBooking = (customerid) => {
    return this.httpGET(API.GET_HISTORY, {
      customerid,
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
        params: { id: 103, reason },
      }
    );
  };
}

export const historyService = new HistoryService();
