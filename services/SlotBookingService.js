import AbstractService from './AbstractService';

const API = {
    GET_ALL: 'SlotBookings/GetSlotBookingByDateAndConsultanid',
};

class SlotBookingService extends AbstractService {
    getAll = (date, consultantId) => {
        return this.httpGET(API.GET_ALL, { date, consultantid: consultantId });
    };
}

export const slotBookingService = new SlotBookingService();
