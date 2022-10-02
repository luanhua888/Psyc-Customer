import { useState, forwardRef, useImperativeHandle } from 'react';

import Modal from '../modal';

const ModalRegister = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
        },
    }));

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title={'Đăng ký tài khoản'}
            onConfirm={() => console.log('Button confirm')}
            onDiscard={() => console.log('Button discard')}
            buttons={[
                {
                    role: 'discard',
                    toClose: true,
                    classes:
                        'bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200',
                    label: 'Hủy',
                },
                {
                    role: 'confirm',
                    toClose: false,
                    classes:
                        'bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-200',
                    label: 'Đăng ký',
                },
            ]}
            {...props}>
            <div className='flex flex-row gap-3'>
                <div className='outline outline-yellow-300 rounded'>
                    <input
                        className='p-3 rounded'
                        type='text'
                        placeholder='Username'
                    />
                </div>
                <div className='outline outline-yellow-300 rounded'>
                    <input
                        className='p-3 rounded'
                        type='text'
                        placeholder='Pasword'
                    />
                </div>
            </div>
        </Modal>
    );
});

export default ModalRegister;
