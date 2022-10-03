import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { userService } from '../../services/UserService';

import Modal from '../modal';
import ModalLogin from './ModalLogin';

const ModalRegister = forwardRef((props, ref) => {
    const modalLoginRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const [dataForm, setDataForm] = useState({
        email: '',
        username: '',
        password: '',
        code: '',
    });
    const [message, setMessage] = useState('');
    const [btnSubmitTitle, setBtnSubmitTitle] = useState('Đăng ký');
    const [isVerifyCode, setIsVerifyCode] = useState(false);

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
        },
    }));

    const onSubmit = async () => {
        if (isVerifyCode) {
            try {
                const data = await userService.registerConfirm(
                    dataForm.email,
                    dataForm.code
                );
                setMessage(data.message);

                setTimeout(() => {
                    setDataForm({});
                    setMessage('');
                    setBtnSubmitTitle('Đăng ký');
                    setIsVerifyCode(false);
                    setIsOpen(false);
                    modalLoginRef.current.open();
                }, 1500);
            } catch (err) {}
        } else {
            try {
                const data = await userService.register(
                    dataForm.username,
                    dataForm.email,
                    dataForm.password
                );

                const responseResendCode = await userService.registerResendCode(
                    dataForm.email
                );

                setMessage(responseResendCode.message);

                setTimeout(() => {
                    setBtnSubmitTitle('Xác nhận');
                    setIsVerifyCode(true);
                }, 300);
            } catch (err) {
                setMessage(err.response.data.message);

                setTimeout(() => {
                    setBtnSubmitTitle('Xác nhận');
                    setIsVerifyCode(true);
                }, 300);
            }
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={'Đăng ký tài khoản'}
                onConfirm={onSubmit}
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
                            'bg-indigo-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200',
                        label: btnSubmitTitle,
                    },
                ]}
                {...props}>
                {message != '' && (
                    <div className='flex justify-center items-center mb-3 text-blue-300 font-medium'>
                        {message}
                    </div>
                )}
                {isVerifyCode ? (
                    <div className='flex flex-col'>
                        <div className='outline outline-blue-300 rounded'>
                            <input
                                id='code'
                                name='code'
                                className='p-3 rounded w-full'
                                type='text'
                                placeholder='Code'
                                value={dataForm.code}
                                onChange={(e) =>
                                    setDataForm({
                                        ...dataForm,
                                        code: e.currentTarget.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-3'>
                        <div className='outline outline-blue-300 rounded'>
                            <input
                                id='username'
                                name='username'
                                className='p-3 rounded w-full'
                                type='text'
                                placeholder='Tài khoản'
                                required
                                onChange={(e) =>
                                    setDataForm({
                                        ...dataForm,
                                        username: e.currentTarget.value,
                                    })
                                }
                            />
                        </div>
                        <div className='outline outline-blue-300 rounded '>
                            <input
                                id='email'
                                name='email'
                                className='p-3 rounded w-full'
                                type='email'
                                placeholder='Địa chỉ email'
                                required
                                onChange={(e) =>
                                    setDataForm({
                                        ...dataForm,
                                        email: e.currentTarget.value,
                                    })
                                }
                            />
                        </div>
                        <div className='outline outline-blue-300 rounded'>
                            <input
                                id='password'
                                name='password'
                                className='p-3 rounded w-full'
                                type='password'
                                placeholder='Mật khẩu'
                                required
                                onChange={(e) =>
                                    setDataForm({
                                        ...dataForm,
                                        password: e.currentTarget.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                )}
            </Modal>
            <ModalLogin ref={modalLoginRef} />
        </>
    );
});

export default ModalRegister;
