import AbstractService from "./AbstractService";

const API = {
  GET_ROOMCALL: "SlotBookings/getroomslotbooking",

};

class VideoCallService extends AbstractService {


//id này lấy 
  getRoomAgrora = (id) => {
    return this.httpGET(API.GET_ROOMCALL, {id}, 
      {
        params: {},
    }
   );
  };
}

export const videoCallService = new VideoCallService();