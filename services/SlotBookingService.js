import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'SlotBookings/GetSlotBookingByDateAndConsultanid',
    POST_BOOKING: 'Bookings/create',
    POST_RATE: 'Bookings/feedbackbycustomer',
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

    postVoteStar = (id, feedback, rate ) => {
        return this.httpPUT(API.POST_RATE, { },
            {
                params: {id, feedback, rate},
            }
            );
    };

}

export const slotBookingService = new SlotBookingService();
