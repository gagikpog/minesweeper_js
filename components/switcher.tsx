import styles from '../styles/Switcher.module.css';
import { ChangeEvent } from 'react';

interface IProps {
    checked?: boolean;
    onChange?: (event: ChangeEvent) => void;
    className?: string;
    htmlForName: string;
}

export default function Switcher(props: IProps) {
    return (
        <label className={`${props.className || ''} ${styles.switch}`}>
            <input id={props.htmlForName} type='checkbox' checked={props.checked} onChange={props.onChange}/>
            <span className={`${styles.slider} ${styles.round}`}></span>
        </label>
    );
}
