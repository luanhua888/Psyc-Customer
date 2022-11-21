import {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from "react";
import Modal from "../modal";
import { userService } from "../../services/UserService";

// eslint-disable-next-line react/display-name
const ModalRating = forwardRef((id, ref, handleClose) => {
    const modalMapRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const [dataForm, setDataForm] = useState({});

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
        },
    }));


    const onSubmit = async (data) => {
        try {
            let dataPost = {
                ...data,
                latitude: data.latitude.toString(),
                longitude: data.longitude.toString(),
            };

            await userService.profileUpdate(dataPost, id.id.id);
        } catch (err) {
            console.log("err", err);
        }
    };


    return (
        <div className="absolute top-0">
            <Modal
                classes="overflow-hidden max-w-full max-h-full w-2/3 h-auto p-4 bg-white rounded-lg "
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={"Đánh giá cuộc hẹn"}
                onClose={handleClose}
                onDiscard={() => console.log("Button discard")}
                // buttons={[
                //   {
                //     role: "discard",
                //     toClose: true,
                //     classes:
                //       "bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200",
                //     label: "Cập nhật",
                //   },
                // ]}
            >

            </Modal>
        </div>
    );
});

export default ModalRating;
