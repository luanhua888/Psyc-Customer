import _ from 'lodash';
import Image from 'next/image';
import avatarImg from '../public/photos/avatar.jpeg';
import { consultantService } from '../services/ConsultantService';

export default function Chat(props) {
    const { consultants } = props;

    return (
        <>
            <section>
                <div className='md:container mx-auto pt-12'>
                    <div className='flex flex-wrap justify-between gap-3'>
                        {!_.isUndefined(consultants) &&
                            !_.isEmpty(consultants) &&
                            consultants.map((row, index) => (
                                <div
                                    key={index}
                                    className='flex flex-1 justify-between bg-white p-4 rounded-xl shadow-lg'>
                                    <div className='flex'>
                                        <div className='flex flex-col gap-2 justify-center items-center pr-3'>
                                            <div className='w-[75px] h-[75px] rounded-full bg-gradient-to-bl from-blue-300 to-blue-800'>
                                                <Image
                                                    loader={() => row.imageUrl}
                                                    className=''
                                                    src={avatarImg}
                                                    alt=''
                                                    width={75}
                                                    height={75}
                                                />
                                            </div>
                                            <div class='flex items-center'>
                                                {Array.apply(null, {
                                                    length: 5,
                                                })
                                                    .map(Number.call, Number)
                                                    .map((num, index) => {
                                                        let stateStar =
                                                            'text-yellow-400';

                                                        if (num >= row.rating) {
                                                            stateStar =
                                                                'text-gray-300 dark:text-gray-500';
                                                        }

                                                        return (
                                                            <svg
                                                                key={num}
                                                                aria-hidden='true'
                                                                class={`w-5 h-5 ${stateStar}`}
                                                                fill='currentColor'
                                                                viewBox='0 0 20 20'
                                                                xmlns='http://www.w3.org/2000/svg'>
                                                                <title>
                                                                    First star
                                                                </title>
                                                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                                                            </svg>
                                                        );
                                                    })}
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className='text-lg font-medium cursor-pointer hover:text-blue-500'>
                                                {row.fullName}
                                            </div>
                                            <div className='text-[#807f7f] text-sm'>
                                                {row.gender}
                                            </div>
                                            <div className='text-[#807f7f] text-sm'>
                                                {row.address}
                                            </div>
                                            <div className='text-[#807f7f] text-sm'>
                                                {row.experience} năm
                                            </div>
                                            <div className='text-red-600 font-medium'>
                                                FREE
                                            </div>
                                        </div>
                                    </div>
                                    <div className='self-center'>
                                        <button className='px-4 py-2 rounded-3xl text-blue-500 border-2 border-blue-500 hover:ring hover:ring-blue-300'>
                                            Trò chuyện
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps(context) {
    const { data: consultants } = await consultantService.getAll();

    return {
        props: {
            consultants,
        },
    };
}