import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'SlotBookings/GetSlotBookingByDateAndConsultanid',
    POST_BOOKING: 'Bookings/create',
};

class SlotBookingService extends AbstractService {
    getAll = (date, consultantId) => {
        return this.httpGET(API.GET_ALL, { date, consultantid: consultantId });
    };

    
    postBooking = (slotid, customerid, consultantid ) => {
        return this.httpPOST(API.POST_BOOKING, { },
            {
                params: {slotid, customerid, consultantid},
            }
            );
    };


}

export const slotBookingService = new SlotBookingService();
