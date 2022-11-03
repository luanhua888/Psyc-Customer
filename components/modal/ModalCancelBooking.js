import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Button,
    DialogActions,
} from '@mui/material';
import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { useRouter } from 'next/router';
import { historyService } from '../../services/HistoryService';

const ModalCancelBooking = ({
    id,
    title,
    subtitle,
    children,
    isOpen,
    handleClose,
}) => {
    

    const [dataForm, setDataForm] = useState({
        reason: '',
    });

    const handleConfirm = () => {
        alert('You Agreed!');
        handleClose();
    };

    const router = useRouter();

    const onsubmit = async () => {
        historyService.putCanelBooking(id, dataForm.reason);
        alert('Bạn đã hủy thành công');
        handleClose();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            className='justify-center items-center w-full m-100'>
            <div className='flex flex-col gap-3'>
                <div className='text-4xl px-[20%] py-2 pt-8 font-semibold justify-center text-center items-center'>
                    Bạn có chắc muốn hủy cuộc hẹn này?
                </div>
                <div className='items-center justify-center rounded w-[550px] h-[150px] py-10 px-10'>
                    <input
                        id='reason'
                        name='reason'
                        className='p-3 rounded w-[100%] h-[100%] border-2 shadow-md border-gray-300'
                        type='text'
                        placeholder='Lý do bạn muốn hủy cuôc hẹn?'
                        required
                        onChange={(e) =>
                            setDataForm({
                                ...dataForm,
                                reason: e.currentTarget.value,
                            })
                        }
                    />
                </div>
                <div className=''>
                    <button
                        className='outline text-white outline-gray-400 float-right m-2 py-4 px-4 rounded-md bg-sky-300   '
                        onClick={onsubmit}>
                        Xác nhận
                    </button>
                    <button
                        className=' outline outline-gray-400 float-right m-2 py-4 px-4 rounded-md bg-white-500 '
                        onClick={handleClose}>
                        Hủy
                    </button>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalCancelBooking;
