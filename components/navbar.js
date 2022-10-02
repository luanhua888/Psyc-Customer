import { useRef, useEffect, useState } from 'react';

import Image from 'next/image';

import ModalRegister from './modal/ModalRegister';
import ModalLogin from './modal/ModalLogin';
import logo from '../public/logo.png';
import { userService } from '../services/UserService';

export default function Navbar() {
    const modalRegisterRef = useRef();
    const modalLoginRef = useRef();

    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            if (localStorage.getItem('jwttoken')) {
                const data = await userService.profile(
                    localStorage.getItem('iddb')
                );

                if (data.statusCode == 200) {
                    setUser(data.data[0]);
                }
            }
        })();
    }, []);

    const onLogout = () => {
        localStorage.removeItem('jwttoken');
        localStorage.removeItem('iddb');
        localStorage.removeItem('idcustomer');
        setUser({});
    };

    return (
        <nav>
            <div className='md:container mx-auto py-3'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-3 justify-center items-center'>
                        <Image src={logo} alt='' />
                        <div className='flex flex-col'>
                            <span>PSYC</span>
                            <span>Psychological Counselling</span>
                        </div>
                    </div>
                    <ul className='flex gap-5'>
                        <li>
                            <a
                                href='#'
                                className='pb-2 hover:border-b-2 hover:border-yellow-300'>
                                Trang chủ
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='pb-2 hover:border-b-2 hover:border-yellow-300'>
                                Trực tiếp
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='pb-2 hover:border-b-2 hover:border-yellow-300'>
                                Dịch vụ
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='pb-2 hover:border-b-2 hover:border-yellow-300'>
                                Tương thích cặp đôi
                            </a>
                        </li>
                        <li>
                            <a
                                href='#'
                                className='pb-2 hover:border-b-2 hover:border-yellow-300'>
                                Bản đồ sao
                            </a>
                        </li>
                    </ul>
                    {Object.keys(user).length >= 1 ? (
                        <div className='flex justify-center items-center gap-5'>
                            <p className='text-lg font-bold'>{user.userName}</p>
                            <a onClick={onLogout}>Logout</a>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center gap-5'>
                            <a onClick={() => modalLoginRef.current?.open()}>
                                Đăng nhập
                            </a>
                            <a onClick={() => modalRegisterRef.current?.open()}>
                                Đăng ký
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <ModalRegister ref={modalRegisterRef} />
            <ModalLogin ref={modalLoginRef} />
        </nav>
    );
}