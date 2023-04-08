import { MouseEvent, TouchEvent } from 'react';
import { IconSizes } from '../game/types';
import styles from '../styles/Button.module.css';

interface IProps {
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
    onTouchEnd?: (event: TouchEvent<HTMLDivElement>) => void;
    icon: string;
    clickable?: boolean;
    size?: IconSizes;
    className?: string;
    caption?: string;
}

export default function Button(props: IProps) {

    const clickable = props.clickable ?? !!props.onClick;
    return (
        <div className={`tw-flex tw-justify-center tw-items-center tw-p-8 ${props.className || ''} ${clickable ? `tw-cursor-pointer ${styles.clickable}` : ''}`}
            onClick={props.onClick} onTouchEnd={props.onTouchEnd}>
            <div>
                <i className={`fa ${props.icon} ${props.size || ''}`}></i> { props.caption ?? '' }
            </div>
        </div>
    );
}
