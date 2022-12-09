import {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import Modal from "../modalBookingTable";
import dayjs from "dayjs";
import { slotBookingService } from "../../services/SlotBookingService";
import _ from "lodash";
import ModalSuccess from "./ModalSuccess";
import ModalBookingFail from "./ModalBookingFail";

const ACTION_TYPE = {
  BOOKING: "booking",
  CONFIRM: "confirm",
};

// eslint-disable-next-line react/display-name
const ModalBooking = forwardRef((props, ref) => {
  const modalSuccessRef = useRef();
  const modalBookingFailRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [consultant, setConsultant] = useState({});
  const [selectionInfo, setSelectionInfo] = useState({});
  const [selectedBooking, setSelectedBooking] = useState({});
  const [slotBookings, setSlotBookings] = useState([]);
  //
  const [slotId, setSlotId] = useState([]);
  const [consultantId, setConsultantId] = useState([]);

  const [actionType, setActionType] = useState(ACTION_TYPE.BOOKING);
  const [btnActionType, setBtnActionType] = useState({
    [ACTION_TYPE.BOOKING]: "Đặt lịch",
    [ACTION_TYPE.CONFIRM]: "Xác nhận",
  });

  const getSlotBookings = (date, consultantId) => {
    slotBookingService.getAll(date, consultantId).then((response) => {
      if (!_.isEmpty(response.data)) {
        setSlotBookings(response.data);
      } else {
        setSlotBookings([]);
      }
    });
  };

  const onBooking = async () => {
    setActionType(ACTION_TYPE.CONFIRM);
  };

  const onPayment = async () => {
    setIsOpen(false);
    modalSuccessRef.current.open();
    // modalBookingFailRef.current.open();
  };

  const onBookingFail = async () => {
    setIsOpen(false);
    modalBookingFailRef.current.open();
  };

  const resetDefault = () => {
    setActionType(ACTION_TYPE.BOOKING);
    setConsultant({});
    setConsultantId({});
    setSelectionInfo({});
    setSelectedBooking({});
    setSlotBookings([]);
  };

  useImperativeHandle(ref, () => ({
    open: (consultant) => {
      setIsOpen(true);
      setConsultant(consultant);
      setConsultantId(consultant.id);
    },
    close: () => {
      setIsOpen(false);
    },
  }));

  useEffect(() => {
    return () => {
      resetDefault();
    };
  }, []);

  return (
    <div className="fixed top-0">
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        classes=" bg-[#17384e] text-[#ff7010] p-4"
        title={"Đặt lịch hẹn"}
        onConfirm={() => {
          if (actionType === ACTION_TYPE.BOOKING) {
            onBooking();
          }

          if (actionType === ACTION_TYPE.CONFIRM) {
            onPayment();
          }
          // else {
          //  onBookingFail();
          // }
        }}
        onCancel={() => {
          onBookingFail();
          setIsOpen(false);
        }}
        onDiscard={() => {
          resetDefault();
        }}
        buttons={[
          {
            role: "discard",
            toClose: true,
            classes:
              "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200 text-white  bg-[#17384e] text-[#ff7010] ",
            label: "Hủy",
          },
          {
            role: "confirm",
            toClose: false,
            classes:
              "bg-[#ff7010] px-4 py-2 rounded-lg hover:bg-[#286289] transition-all duration-200 text-white  ",
            label: btnActionType[actionType],
          },
        ]}
        className="flex"
        {...props}
      >
        {actionType === ACTION_TYPE.BOOKING ? (
          <div className="flex flex-row  bg-[#031d2e]">
            <div>
              <FullCalendar
                // chuyển today thành ngày hiện tại
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                height="auto"
                // chuyển  thành tiếng việt
                locale="vi"
                className="bg-[#17384e]"
                showNonCurrentDates={false}
                selectable={true}
                select={(info) => {
                  var currentDay = new dayjs();
                  var daySelected = info.start;

                  setSelectionInfo(info);
                  getSlotBookings(info.startStr, consultant.id);
                  if (daySelected >= currentDay) {
                    getSlotBookings(info.startStr);
                    setSelectionInfo(info);
                  }
                }}
              />
            </div>


            <div locale="vi">
             
                <div className="w-[300px]">
                  
                  <div className="flex flex-col flex-wrap gap-2 px-4 py-4  justify-center items-center">
                    <div className="border-b-2 pl-2 ">
                      {dayjs(selectionInfo.start).format("dddd, DD MMMM YYYY")}
                    </div>
                    <div className="justify-center">
                      <span className="text-[#ff7010] font-mono">
                        Giá: {selectedBooking.price} Gem
                      </span>
                    </div>
                    <div>
                      <span>Hãy chọn giờ bạn muốn đặt</span>
                    </div>


                  {slotBookings.length > 0 ? (
                    <div className="">
                      <div className="flex  h-40 overflow-y-scroll px-1  flex-wrap ">
                        {slotBookings.map((row, index) => (
                          <button
                            key={row.id}
                            className="py-2 px-2 h-10 w-60 border-2 ring-[#17384e] hover:text-white  text-[#ff7010] rounded-2xl hover:bg-[#ff7010] cursor-pointer hover:ring focus:ring
                          
                            "
                            // đổi màu khi chọn giờ
                            style={{
                              backgroundColor:
                                selectedBooking.id === row.id
                                  ? "#ff7010"
                                  : "#17384e",
                              color:
                                selectedBooking.id === row.id
                                  ? "#17384e"
                                  : "#ff7010",
                            }}

                            onClick={() =>
                              setSelectedBooking(row) &&
                              setSlotId(selectedBooking.id)
                            }


                          >
                            {row.timeStart} - {row.timeEnd}
                          </button>
                        ))}
                      </div>
                    </div>

                  ) : (
                    <div className="flex flex-col justify-center text-white font-bold">
                      <span >Không có lịch hẹn nào</span>
                      <span >Vui lòng chọn ngày khác</span>
                    </div>
                  )}
                  </div>
                 
                </div>
             
            </div>




            
          </div>
        ) : (
          <div>
            Bạn đã đặt lịch hẹn với {consultant.fullName} vào lúc{" "}
            {selectedBooking.timeStart} - {selectedBooking.timeEnd}{" "}
            {dayjs(selectionInfo.start).format("dddd, DD MMMM YYYY")}
          </div>
        )}
      </Modal>
      <ModalSuccess
        id={selectedBooking}
        // consultantId={consultantId}
        ref={modalSuccessRef}
      />
      <ModalBookingFail id={selectedBooking.id} ref={modalBookingFailRef} />
    </div>
  );
});

export default ModalBooking;
