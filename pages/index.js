import dayjs from 'dayjs';

import Head from 'next/head';
import Image from 'next/image';

import astroRoundedImg from '../public/photos/astro-rounded.png';
import logoFooterImg from '../public/logo_footer.png';

import { zodiacService } from '../services/ZodiacService';

export default function Home(props) {
    const { zodiacs } = props;

    return (
        <>
            <section id='hero-banner' className='bg-slate-700'>
                <div className='md:container mx-auto py-6'>
                    <div className='p-12 flex justify-between items-center bg-gradient-to-r from-yellow-400 to-slate-200 rounded-3xl'>
                        <Image className='' src={astroRoundedImg} alt='' />
                        <div className='flex flex-col gap-5 text-slate-800'>
                            <h3 className='font-sans text-[2.625rem] leading-[3.125rem]'>
                                Got any questions?
                            </h3>
                            <h1 className='font-sans text-[3.25rem] leading-[3.875rem] font-semibold'>
                                Chat with Astrologer
                            </h1>
                            <p className='font-sans text-[2.625rem] leading-[3.125rem]'>
                                FOR FREE
                            </p>
                        </div>
                        <a
                            href='#'
                            className='py-3 px-8 bg-yellow-300 rounded-full text-3xl font-semibold hover:ring-8 hover:ring-yellow-500'>
                            Chat now
                        </a>
                    </div>
                </div>
            </section>
            <section id='services' className='bg-slate-900'>
                <div className='md:container mx-auto py-5'>
                    <div className='flex justify-around'>
                        <div className='flex flex-col gap-3 justify-center items-center bg-white py-5 px-24 rounded-xl'>
                            <Image
                                src={astroRoundedImg}
                                alt=''
                                width={65}
                                height={65}
                            />
                            <a href='#'>Chat</a>
                        </div>
                        <div className='flex flex-col gap-3 justify-center items-center bg-white py-5 px-24 rounded-xl'>
                            <Image
                                src={astroRoundedImg}
                                alt=''
                                width={65}
                                height={65}
                            />
                            <a href='#'>Chat</a>
                        </div>
                        <div className='flex flex-col gap-3 justify-center items-center bg-white py-5 px-24 rounded-xl'>
                            <Image
                                src={astroRoundedImg}
                                alt=''
                                width={65}
                                height={65}
                            />
                            <a href='#'>Chat</a>
                        </div>
                        <div className='flex flex-col gap-3 justify-center items-center bg-white py-5 px-24 rounded-xl'>
                            <Image
                                src={astroRoundedImg}
                                alt=''
                                width={65}
                                height={65}
                            />
                            <a href='#'>Chat</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id='services' className='bg-yellow-400'>
                <div className='md:container mx-auto py-5'>
                    <div className='flex flex-col justify-between gap-3'>
                        <div className='flex flex-row flex-wrap justify-between gap-3'>
                            {zodiacs.map((row, key) => (
                                <div
                                    key={key}
                                    className='flex flex-col gap-1 justify-center items-center bg-white py-5 px-12 rounded-xl w-[200px]'>
                                    <Image
                                        loader={() => row.imageUrl}
                                        src={astroRoundedImg}
                                        alt=''
                                        width={65}
                                        height={65}
                                    />
                                    <a
                                        href='#'
                                        className='text-lg font-semibold'>
                                        {row.name}
                                    </a>
                                    <p>{`${dayjs(row.dateStart).format(
                                        'DD/MM'
                                    )} - ${dayjs(row.dateEnd).format(
                                        'DD/MM'
                                    )}`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id='complimentary-astrology' className='bg-slate-100'>
                <div className='md:container mx-auto py-8'>
                    <h1 className='text-center text-2xl font-semibold mb-3'>
                        COMPLIMENTARY ASTROLOGY SERVICES
                    </h1>
                    <div className='flex justify-around gap-4'>
                        <div className='flex flex-col gap-1 justify-center items-center bg-white py-10 px-5 rounded-xl min-w-[294px] max-w-[356px] shadow-md shadow-yellow-300'>
                            <Image
                                src={astroRoundedImg}
                                alt=''
                                width={65}
                                height={65}
                            />
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <h3 className='text-sm font-semibold'>
                                    Free kundii
                                </h3>
                                <p className='text-sm text-justify'>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Quasi illum voluptas
                                    tempora ut repellendus obcaecati impedit
                                    error? Sed, beatae fuga? Tenetur, vero
                                    beatae.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 justify-center items-center bg-white py-10 px-5 rounded-xl min-w-[294px] max-w-[356px] shadow-md shadow-yellow-300'>
                            <Image
                                src={astroRoundedImg}
                                alt=''
                                width={65}
                                height={65}
                            />
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <h3 className='text-sm font-semibold'>
                                    Free kundii
                                </h3>
                                <p className='text-sm text-justify'>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Quasi illum voluptas
                                    tempora ut repellendus obcaecati impedit
                                    error? Sed, beatae fuga? Tenetur, vero
                                    beatae.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 justify-center items-center bg-white py-10 px-5 rounded-xl min-w-[294px] max-w-[356px] shadow-md shadow-yellow-300'>
                            <Image
                                src={astroRoundedImg}
                                alt=''
                                width={65}
                                height={65}
                            />
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <h3 className='text-sm font-semibold'>
                                    Free kundii
                                </h3>
                                <p className='text-sm text-justify'>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Quasi illum voluptas
                                    tempora ut repellendus obcaecati impedit
                                    error? Sed, beatae fuga? Tenetur, vero
                                    beatae.
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 justify-center items-center bg-white py-10 px-5 rounded-xl min-w-[294px] max-w-[356px] shadow-md shadow-yellow-300'>
                            <Image
                                src={astroRoundedImg}
                                alt=''
                                width={65}
                                height={65}
                            />
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <h3 className='text-sm font-semibold'>
                                    Free kundii
                                </h3>
                                <p className='text-sm text-justify'>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Quasi illum voluptas
                                    tempora ut repellendus obcaecati impedit
                                    error? Sed, beatae fuga? Tenetur, vero
                                    beatae.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='#trust_score'>
                <div className='md:container mx-auto py-9 bg-gradient-to-b from-yellow-400 to-slate-800'>
                    <div className='flex justify-evenly items-center text-white text-center'>
                        <div>
                            <p className='text-3xl font-bold'>6,902+</p>
                            <p className='text-base'>Total Astrologers</p>
                        </div>
                        <div>
                            <p className='text-3xl font-bold'>6,902+</p>
                            <p className='text-base'>Total Astrologers</p>
                        </div>
                        <div>
                            <p className='text-3xl font-bold'>6,902+</p>
                            <p className='text-base'>Total Astrologers</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id='about_us' className='bg-slate-100'>
                <div className='md:container mx-auto py-5'>
                    <div className='text-center pb-4'>
                        <h3 className='font-semibold text-2xl'>
                            WHY ASTROLOGY ?
                        </h3>
                        <p className='text-xl font-medium'>
                            Astrology reveals the will of the God
                        </p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <p>
                            Chiêm tinh học là một ngành khoa học dự đoán với các
                            bộ phương pháp, tuyên bố và phát hiện riêng đã mãi
                            mãi truyền cảm hứng và cho phép mọi người có cái
                            nhìn sâu sắc về các khía cạnh khác nhau của cuộc
                            sống của họ. Chiêm tinh học, với những kinh ngạc và
                            cách thức của nó, hài lòng và đủ chấp thuận để khiến
                            mọi người trở thành một tín đồ của cùng một. Và may
                            mắn thay, nó tiếp tục làm như vậy bất chấp thế giới
                            đang thay đổi căn cứ từ những gì họ tin tưởng và
                            những gì họ không tin tưởng.
                        </p>
                        <p>
                            Nếu người ta phải đi sâu vào các kỹ thuật của chiêm
                            tinh học, đó là nghiên cứu về các vật thể vũ trụ
                            khác nhau, thường là các ngôi sao và hành tinh, có
                            ảnh hưởng đến cuộc sống của con người. Bạn phải lưu
                            ý rằng có tới 8 hành tinh trong hệ mặt trời. Tuy
                            nhiên, nếu tôi hỏi một nhà chiêm tinh học trực tuyến
                            gần tôi về các hành tinh trong chiêm tinh học, họ sẽ
                            nói với tôi rằng có tới 9 hành tinh trong chiêm tinh
                            học còn được gọi là Navagrahas. Và đáng ngạc nhiên,
                            hành tinh Trái đất, trong chiêm tinh học, không được
                            tính trong số chín hành tinh.
                        </p>
                        <p>
                            Trong số các hành tinh này, một số hành tinh được
                            gọi là hành tinh thân thiện, có nghĩa là sự hiện
                            diện của chúng mang lại sự tích cực cho cuộc sống
                            của bạn. Và sau đó, cũng có những hành tinh có ảnh
                            hưởng tiêu cực đến con người. Sau này sẽ là các hành
                            tinh như Rahu và Ketu. Sự hiện diện của họ trong
                            Kundli của một người được cho là mang lại nỗi đau và
                            sự khốn khổ. Tuy nhiên, có một khía cạnh khác mà
                            người ta cần phải nhận thức được. Đó là thực tế rằng
                            sự hiện diện của Ketu trong tử vi của một người
                            không phải lúc nào cũng xấu và tương tự, sự hiện
                            diện của Sao Mộc trong Kundli của một người có thể
                            không phải là tốt nhất mọi lúc.
                        </p>
                    </div>
                </div>
            </section>

            <footer className='bg-slate-700'>
                <div className='md:container mx-auto py-10 px-12'>
                    <div className='flex justify-between text-slate-200'>
                        <div className='flex flex-col gap-5'>
                            <h3 className='font-semibold text-2xl border-b-2 border-yellow-300'>
                                TỔNG ĐÀI HỖ TRỢ
                            </h3>
                            <p>Góp ý, khiếu nại 0964155538</p>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <h3 className='font-semibold text-2xl border-b-2 border-yellow-300'>
                                VỀ PYSC
                            </h3>
                            <ul className='flex flex-col gap-2'>
                                <li>
                                    <a
                                        href='#'
                                        className='hover:border-b-2 hover:border-yellow-300'>
                                        Giới thiệu
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='hover:border-b-2 hover:border-yellow-300'>
                                        Giới thiệu
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='hover:border-b-2 hover:border-yellow-300'>
                                        Giới thiệu
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        className='hover:border-b-2 hover:border-yellow-300'>
                                        Giới thiệu
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='flex flex-col w-[18.75rem]'>
                            <Image src={logoFooterImg} alt='' />
                            <p>
                                Hướng đến mục tiêu mang lại nơi để mọi người có
                                thể trò chuyện với nhau giải quyết các vấn đề
                                tâm lý. Hãy cùng PYSC hướng đến cuộc sống năng
                                động tích cực hơn.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export async function getServerSideProps(context) {
    const { data: zodiacs } = await zodiacService.getAll();

    return {
        props: {
            zodiacs,
        },
    };
}