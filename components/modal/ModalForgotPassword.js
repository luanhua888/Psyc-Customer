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

const ACTION_TYPE = {
    FORGOT_PASSWORD: 'forgot_password',
    RESEND_CODE: 'resend_code',
    CONFIRM: 'confirm',
};

const BTN_ACTION_TYPE = {
    [ACTION_TYPE.FORGOT_PASSWORD]: 'Lấy lại mật khẩu',
    [ACTION_TYPE.RESEND_CODE]: 'Đổi mật khẩu',
    [ACTION_TYPE.CONFIRM]: 'Xác nhận',
};

// eslint-disable-next-line react/display-name
const ModalForgotPassword = forwardRef((props, ref) => {
    const formRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const [errorMessages, setErrorMessages] = useState({
        isError: false,
        message: '',
    });

    const [disabledFields, setDisabledFields] = useState({
        email: false,
        code: false,
    });

    const [actionType, setActionType] = useState({
        [ACTION_TYPE.RESEND_CODE]: false,
        [ACTION_TYPE.CONFIRM]: false,
    });

    const [btnActionType, setBtnActionType] = useState(
        BTN_ACTION_TYPE[ACTION_TYPE.FORGOT_PASSWORD]
    );

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
            resetDefault();
        };
    }, []);

    const onSubmitEmail = async (values) => {
        const { email } = values;

        try {
            if (email) {
                const responseCheckByEmail =
                    await userService.registerCheckByEmail(email);

                if (responseCheckByEmail.status !== 'null') {
                    const responseResendCode =
                        await userService.registerResendCode(email);

                    setErrorMessages({
                        isError: false,
                        message: responseResendCode.message,
                    });

                    setDisabledFields({
                        ...disabledFields,
                        email: true,
                    });
                    setActionType({
                        ...actionType,
                        [ACTION_TYPE.RESEND_CODE]: true,
                    });
                    setBtnActionType(BTN_ACTION_TYPE[ACTION_TYPE.RESEND_CODE]);
                }
            }
        } catch (err) {
            setErrorMessages({
                isError: true,
                message: err.response.data.message,
            });
            return;
        }
    };

    const onSubmitCode = async (values) => {
        const { email, code, password } = values;

        try {
            if (email && code && password) {
                const responseConfirm = await userService.changePassword(
                    email,
                    code,
                    password
                );

                setErrorMessages({
                    isError: false,
                    message: responseConfirm.message,
                });

                setDisabledFields({
                    ...disabledFields,
                    code: true,
                });

                setTimeout(() => {
                    setIsOpen(false);
                    resetDefault();
                }, 1500);
            }
        } catch (err) {
            setErrorMessages({
                isError: true,
                message: err.response.data.message,
            });
            return;
        }
    };

    const resetDefault = () => {
        setErrorMessages({
            isError: false,
            message: '',
        });
        setDisabledFields({
            email: false,
            code: false,
        });
        setActionType({
            [ACTION_TYPE.RESEND_CODE]: false,
            [ACTION_TYPE.CONFIRM]: false,
        });
        setBtnActionType(BTN_ACTION_TYPE[ACTION_TYPE.FORGOT_PASSWORD]);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={'Lấy lại mật khẩu'}
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
                        label: btnActionType,
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
                    initialValues={{
                        email: '',
                        code: '',
                        password: '',
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Thông tin bắt buộc';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                values.email
                            )
                        ) {
                            errors.email = 'Email không đúng định dạng';
                        }

                        if (actionType[ACTION_TYPE.RESEND_CODE]) {
                            if (!values.code) {
                                errors.code = 'Thông tin bắt buộc';
                            }

                            if (!values.password) {
                                errors.password = 'Thông tin bắt buộc';
                            }
                        }

                        return errors;
                    }}
                    onSubmit={async (values) => {
                        if (actionType[ACTION_TYPE.RESEND_CODE]) {
                            await onSubmitCode(values);
                        } else {
                            await onSubmitEmail(values);
                        }
                    }}>
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
                                    {errors.email &&
                                        touched.email &&
                                        errors.email}
                                </div>
                                <div className='outline outline-blue-300 rounded'>
                                    <input
                                        className='p-3 rounded w-full'
                                        id='email'
                                        name='email'
                                        type='text'
                                        placeholder='Email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        disabled={disabledFields.email}
                                    />
                                </div>
                            </div>
                            {actionType[ACTION_TYPE.RESEND_CODE] && (
                                <>
                                    <div className='flex flex-col gap-1'>
                                        <div className='text-red-500'>
                                            *{' '}
                                            {errors.code &&
                                                touched.code &&
                                                errors.code}
                                        </div>
                                        <div className='outline outline-blue-300 rounded'>
                                            <input
                                                className='p-3 rounded w-full'
                                                name='code'
                                                type='number'
                                                placeholder='Code'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.code}
                                                disabled={disabledFields.code}
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
                                                placeholder='Mật khẩu mới'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </Formik>
            </Modal>
        </>
    );
});

export default ModalForgotPassword;
