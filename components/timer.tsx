import { useSelector } from 'react-redux';
import { RootState } from '../store/main';

interface IProps {
    className?: string;
}

export default function Timer(props: IProps) {
    const time = useSelector((state: RootState) => state.timer.time);
    return (
        <div className={`tw-flex tw-justify-center tw-items-center tw-p-8 ${props.className || ''}`}>
            <div>
                <i className='fa fa-clock-o tw-ml-4'></i> {time}
            </div>
        </div>
    );
}
