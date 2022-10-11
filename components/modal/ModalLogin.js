import {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react';
import Router from 'next/router';

import Modal from '../modal';

import { userService } from '../../services/UserService';
import { Formik } from 'formik';
import ModalForgotPassword from './ModalForgotPassword';

// eslint-disable-next-line react/display-name 
const ModalLogin = forwardRef((props, ref) => {
    const formRef = useRef();
    const modalForgotPasswordRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        isError: false,
        message: '',
    });

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true);
        },
        close: () => {
            setIsOpen(false);
        },
    }));

    useEffect(() => {
        return () => {
            setErrorMessages({
                isError: false,
                message: '',
            });
        };
    }, []);

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const data = await userService.login(username, password);

            setErrorMessages({
                isError: false,
                message: data.messsage,
            });

            localStorage.setItem('jwttoken', data.jwttoken);
            localStorage.setItem('iddb', data.iddb);
            localStorage.setItem('idcustomer', data.idcustomer);

            setTimeout(() => {
                setErrorMessages({});
                setIsOpen(false);
                Router.reload(window.location.pathname);
            }, 500);
        } catch (err) {
            setErrorMessages({
                isError: true,
                message: err.response.data.message,
            });
            return;
        }
    };

    return (
        <div className='fixed top-0'>
            <Modal
                classes='  px-2 py-2 h-50 rounded bg-white'
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={'Đăng nhập'}
                onConfirm={() => formRef.current.submitForm()}
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
                {errorMessages.message && (
                    <div
                        className={`flex justify-center items-center mb-3 font-medium ${
                            errorMessages.isError
                                ? 'text-red-500'
                                : 'text-blue-500'
                        }`}>
                        {errorMessages.message}
                    </div>
                )}
                <Formik
                    innerRef={formRef}
                    initialValues={{ username: '', password: '' }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.username) {
                            errors.username = 'Thông tin bắt buộc';
                        }

                        if (!values.password) {
                            errors.password = 'Thông tin bắt buộc';
                        }

                        return errors;
                    }}
                    onSubmit={onSubmit}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col gap-1'>
                                <div className='text-red-500'>
                                    *{' '}
                                    {errors.username &&
                                        touched.username &&
                                        errors.username}
                                </div>
                                <div className='outline outline-blue-300 rounded'>
                                    <input
                                        className='p-3 rounded w-full'
                                        id='username'
                                        name='username'
                                        type='text'
                                        placeholder='Tài khoản'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <div className='text-red-500'>
                                    *{' '}
                                    {errors.password &&
                                        touched.password &&
                                        errors.password}
                                </div>
                                <div className='outline outline-blue-300 rounded'>
                                    <input
                                        className='p-3 rounded w-full'
                                        name='password'
                                        type='password'
                                        placeholder='Mật khẩu'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <a
                                    className='cursor-pointer'
                                    onClick={() => {
                                        setIsOpen(false);
                                        modalForgotPasswordRef.current.open();
                                    }}>
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>
                    )}
                </Formik>
            </Modal>
            <ModalForgotPassword ref={modalForgotPasswordRef} />
        </div>
    );
});

export default ModalLogin;
