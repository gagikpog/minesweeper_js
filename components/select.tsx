import { MouseEvent, TouchEvent, useEffect, useState } from 'react';
import { isPhone, isTouchDevice } from '../game/detection';
import styles from '../styles/Selector.module.css';
import Button from './button';

interface IItem {
    text: string;
    value: string;
}

interface IProps {
    className?: string;
    value: string;
    icon: string;
    onChange: (value: string) => void;
    items: IItem[];
    horizontalAlign: 'left' | 'right';
}

function selector(items: IItem[], value: string, click: (value: string) => void, horizontalAlign: 'left' | 'right') {
    const align = horizontalAlign === 'left' ? styles.left : styles.right;
    const mode = isPhone ? styles.center : styles.sticky;
    return (
        <div className={`tw-absolute tw-z-10 tw-p-4 ${ styles.popup } ${ mode } ${align}`} onTouchEnd={(event) => {
            event.stopPropagation();
        }}>
            {
                items.map((item) => (
                    <div
                        className={`tw-cursor-pointer tw-p-4 ${value === item.value ? styles.selected : ''}`}
                        key={item.value}
                        
                        onClick={() => click?.(item.value)}>
                        {item.text}
                    </div>
                ))
            }
        </div>
    );
}

export default function Select(props: IProps) {

    const [opened, setOpened] = useState(false);
    const open = (event: MouseEvent<HTMLDivElement>|TouchEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setOpened(!opened);
    };

    const onChange = (value: string) => {
        props.onChange(value);
        setOpened(false);
    }

    useEffect(() => {
        const close = () => setOpened(false);
        const eventName = isTouchDevice() ? 'touchend' : 'click';
        document.body.addEventListener(eventName, close);
        return () => document.body.removeEventListener(eventName, close);
    }, []);

    return (
        <div className={`${props.className || ''} ${ !isPhone ? 'tw-relative' : ''}`}>
            <Button icon={props.icon || 'fa-navicon'} onClick={!isPhone ? open : () => {}} onTouchEnd={ isPhone ? open : () => {} }/>
            {opened ? selector(props.items, props.value, onChange, props.horizontalAlign) : null}
        </div>
    );
}
