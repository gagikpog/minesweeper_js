import { useSelector } from 'react-redux';
import { RootState } from '../store/main';
import Button from './button';

interface IProps {
    className?: string;
}

export default function Timer(props: IProps) {
    const time = useSelector((state: RootState) => state.timer.time);
    return (
        <Button className={props.className} icon='fa-clock-o' caption={`${time}`}/>
    );
}
