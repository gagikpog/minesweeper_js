import { ReactElement } from 'react';

import styles from '../styles/InfoBox.module.css';

interface IProps {
    children: ReactElement;
    message?: string;
    style?: string;
}

export function InfoBox({children, message, style}: IProps) {

    return (
        <div className='tw-relative'>
            { children }
            { message ? <div className={`tw-absolute tw-p-8 ${styles.message} ${style ? styles[style] : ''}`} >{message}</div> : null }
        </div>
    );
}
