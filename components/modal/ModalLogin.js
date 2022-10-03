import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import Router from 'next/router';

import Modal from '../modal';

import { userService } from '../../services/UserService';
import ModalRegister from './ModalRegister';

const ModalLogin = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dataForm, setDataForm] = useState({ username: '', password: '' });
    const [errorMessages, setErrorMessages] = useState('');

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
        },
    }));

    const onSubmit = async () => {
        const { username, password } = dataForm;

        const data = await userService.login(username, password);

        if (data.statusCode == 400) {
            setErrorMessages(data.messsage);
            return;
        }

        localStorage.setItem('jwttoken', data.jwttoken);
        localStorage.setItem('iddb', data.iddb);
        localStorage.setItem('idcustomer', data.idcustomer);

        setErrorMessages(data.message);

        setTimeout(() => {
            setIsOpen(false);
            Router.reload(window.location.pathname);
        }, 500);
    };

    const onForgotPassword = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={'Đăng nhập'}
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
                        label: 'Đăng nhập',
                    },
                ]}
                {...props}>
                {errorMessages != '' && (
                    <div className='flex justify-center items-center mb-3 text-blue-300 font-medium'>
                        {errorMessages}
                    </div>
                )}
                <div className='flex flex-col gap-5'>
                    <div className='outline outline-blue-300 rounded'>
                        <input
                            className='p-3 rounded w-full'
                            id='username'
                            name='username'
                            required
                            type='text'
                            placeholder='Tài khoản'
                            onChange={(e) =>
                                setDataForm({
                                    ...dataForm,
                                    username: e.currentTarget.value,
                                })
                            }
                        />
                    </div>
                    <div className='outline outline-blue-300 rounded'>
                        <input
                            className='p-3 rounded w-full'
                            id='password'
                            name='password'
                            required
                            type='password'
                            placeholder='Mật khẩu'
                            onChange={(e) =>
                                setDataForm({
                                    ...dataForm,
                                    password: e.currentTarget.value,
                                })
                            }
                        />
                    </div>
                    <div className='flex justify-end'>
                        <a
                            className='cursor-pointer'
                            onClick={onForgotPassword}>
                            Quên mật khẩu?
                        </a>
                    </div>
                </div>
            </Modal>
        </>
    );
});

export default ModalLogin;
