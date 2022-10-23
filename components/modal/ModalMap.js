import {
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react';
import Router from 'next/router';

import MapPicker from '../map/MapPicker';
import Modal from '../modal';

// eslint-disable-next-line react/display-name
const ModalMap = forwardRef((props, ref) => {
    const { onChangeLocation } = props;

    const DefaultLocation = { lat: 10.8, lng: 106.8 };
    const DefaultZoom = 10;

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

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
        <div className='absolute top-0'>
            <Modal
                classes='overflow-hidden max-w-full max-h-full w-2/3 h-auto p-4 bg-white rounded-lg'
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={'LẤY KINH ĐỘ VÀ VĨ ĐỘ'}
                onDiscard={() => console.log('Button discard')}
                buttons={[
                    {
                        role: 'discard',
                        toClose: true,
                        classes:
                            'bg-zinc-500/20 px-4 py-2 rounded-lg hover:bg-zinc-500/30 transition-all duration-200',
                        label: 'Cập nhật',
                    },
                ]}>
                <div style={{ height: '50vh', width: '100%' }}>
                    <MapPicker
                        defaultLocation={defaultLocation}
                        zoom={zoom}
                        mapTypeId='roadmap'
                        style={{ height: '700px' }}
                        onChangeLocation={onChangeLocation}
                        onChangeZoom={handleChangeZoom}
                        apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
                    />
                </div>
            </Modal>
        </div>
    );
});

export default ModalMap;
