import AbstractService from "./AbstractService";

const API = {
  GET_APPOINTMENT: "SlotBookings/GetAppointmentByCustomerid",
  GET_HISTORY: "SlotBookings/GetHistoryByConsultantid",
};

class HistoryService extends AbstractService {
  getAppointmentBooking = (id) => {
    return this.httpGET(API.GET_APPOINTMENT, { id });
  };

  getHistoryBooking = (id) => {
    return this.httpGET(API.GET_HISTORY, { id });
  };
}

export const historyService = new HistoryService();
