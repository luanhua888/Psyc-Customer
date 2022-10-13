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

  getHistoryBooking = (customerid) => {
    return this.httpGET(API.GET_HISTORY, {
      customerid
   });
  };
}

export const historyService = new HistoryService();
