import { Button, Table } from 'flowbite-react';
import { Formik } from 'formik';
import Image from 'next/image';
import { useRef } from 'react';
import heroBanner from '../../public/photos/hero-banner-profile.png';
import profileAvatar from '../../public/photos/profile-avatar.png';

export default function Profile() {
    const formRef = useRef();

    const onSubmit = async () => {};

    return (
        <>
            <section className='bg-blue-300'>
                <div className='md:container mx-auto px-24 py-12 '>
                    <div className='flex justify-center items-center'>
                        <div className='flex-1'>
                            <Image
                                className='animate-spin'
                                src={heroBanner}
                                alt=''
                                width={250}
                                height={250}
                            />
                        </div>
                        <div className='flex flex-1 justify-center items-center'>
                            <p className=' text-slate-700 font-bold text-5xl pb-5 border-b-4 border-b-slate-700'>
                                Thông tin cá nhân
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-slate-400'>
                <div className='md:container mx-auto py-5'>
                    <div className='px-7 py-3 rounded-3xl bg-white'>
                        <div className='flex gap-5 mb-12'>
                            <div className='flex flex-col gap-2 border-r'>
                                <div className='w-[150px] h-[150px]'>
                                    <Image src={profileAvatar} alt='' />
                                </div>
                                <input
                                    className='block w-full rounded-3xl'
                                    type='file'
                                />
                            </div>
                            <div className='flex flex-1 flex-col '>
                                <Formik
                                    innerRef={formRef}
                                    initialValues={{
                                        username: '',
                                        password: '',
                                    }}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.username) {
                                            errors.username =
                                                'Thông tin bắt buộc';
                                        }

                                        if (!values.password) {
                                            errors.password =
                                                'Thông tin bắt buộc';
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
                                        <>
                                            <div class='grid gap-6 mb-6 md:grid-cols-2'>
                                                <div>
                                                    <label
                                                        for='first_name'
                                                        class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                                        Họ và Tên
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='first_name'
                                                        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                        placeholder='Nhập dữ liệu'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div class='grid gap-6 mb-6 md:grid-cols-2'>
                                                <div>
                                                    <label
                                                        for='countries'
                                                        class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>
                                                        Giới tính
                                                    </label>
                                                    <select
                                                        id='countries'
                                                        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                                        <option selected>
                                                            Nam
                                                        </option>
                                                        <option value='US'>
                                                            Nữ
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label
                                                        for='first_name'
                                                        class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                                        Ngày tháng năm sinh
                                                    </label>
                                                    <input
                                                        type='datetime-local'
                                                        id='first_name'
                                                        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                        placeholder='Nhập dữ liệu'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div class='grid gap-6 mb-6 md:grid-cols-2'>
                                                <div>
                                                    <label
                                                        for='countries'
                                                        class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>
                                                        Kinh độ
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='first_name'
                                                        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                        placeholder='Nhập dữ liệu'
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        for='first_name'
                                                        class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                                        Vĩ độ
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='first_name'
                                                        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                        placeholder='Nhập dữ liệu'
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div class='grid gap-6 mb-6'>
                                                <div>
                                                    <label
                                                        for='first_name'
                                                        class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                                        Nơi sinh
                                                    </label>
                                                    <textarea
                                                        id='first_name'
                                                        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                                        placeholder='Nhập dữ liệu'
                                                        required></textarea>
                                                </div>
                                            </div>
                                            <button
                                                type='submit'
                                                class='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                                                Lưu
                                            </button>
                                        </>
                                    )}
                                </Formik>
                            </div>
                        </div>

                        <div>
                            <h3 className='text-center mb-6 text-slate-700 font-bold text-xl pb-5 border-b-4 border-b-slate-700'>
                                Danh sách các hồ sơ khác của bạn
                            </h3>

                            <div>
                                <Table hoverable={true}>
                                    <Table.Head>
                                        <Table.HeadCell>STT</Table.HeadCell>
                                        <Table.HeadCell>
                                            Họ và Tên
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Ngày sinh
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Giờ sinh
                                        </Table.HeadCell>
                                        <Table.HeadCell>
                                            Nơi sinh
                                        </Table.HeadCell>
                                        <Table.HeadCell></Table.HeadCell>
                                        <Table.HeadCell></Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className='divide-y'>
                                        <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                            <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                                                #1
                                            </Table.Cell>
                                            <Table.Cell>Vũ Anh Tuấn</Table.Cell>
                                            <Table.Cell>25/01/2000</Table.Cell>
                                            <Table.Cell>08:00</Table.Cell>
                                            <Table.Cell>Nam</Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    outline={true}
                                                    color='warning'>
                                                    Bản đồ sao
                                                </Button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className='flex gap-2'>
                                                    <Button outline={true}>
                                                        Chỉnh sửa
                                                    </Button>
                                                    <Button
                                                        outline={true}
                                                        color='failure'>
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
