import AbstractService from "./AbstractService";

const API = {
  GET_ALL: "SlotBookings/GetSlotLiveStreamByDateAndConsultanid",
};

class LiveStreamService extends AbstractService {

  
  getAll = (date, consultantid) => {
    return this.httpGET(API.GET_ALL, { date, consultantid });
  };




}

export const liveStreamService = new LiveStreamService();
