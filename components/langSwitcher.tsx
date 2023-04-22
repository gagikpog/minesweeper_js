import styles from '../styles/LangSwitcher.module.css';
import { ChangeEvent } from 'react';
import Switcher from './switcher';
import { Lang } from '../game/types';

interface IProps {
    value: Lang;
    onChange?: (lang: Lang) => void;
}

export default function LangSwitcher(props: IProps) {

    const onChange = (event: ChangeEvent) => {
        const input = event.target as HTMLInputElement
        if (input.checked) {
            props.onChange?.(Lang.En);
        } else {
            props.onChange?.(Lang.Ru);
        }
    };

    return (
        <div className='tw-flex' style={{'--background-color-item': '#2196F3'} as React.CSSProperties }>
            <label htmlFor='lang' className='tw-cursor-pointer'>РУ</label>
            <Switcher htmlForName='lang' onChange={onChange} checked={props.value === Lang.En} className='tw-ml-8 tw-mr-8'/>
            <label htmlFor='lang' className='tw-cursor-pointer'>EN</label>
        </div>
    );
}
