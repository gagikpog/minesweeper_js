import { CSSProperties, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { mapGetter } from '../game/funcs/getters';
import { EventType } from '../game/types';
import { RootState } from '../store/main';
import styles from '../styles/View.module.css';
import Item from './item';

interface IViewProps {
    size: number;
    width: number;
    height: number;
    itemClick: (row: number, cell: number, eventType: EventType) => void;
    style?: CSSProperties;
    className?: string;
}

export default function View(props: IViewProps): JSX.Element {

    const gameMap = useSelector((state: RootState) => state.game.gameMap);
    const viewRef = useRef(null)
    const items = useMemo(() => {
        return Array(props.height * props.width).fill(null);
    }, [props.width, props.height]);

    useEffect(() => {
        if (viewRef.current) {
            const viewDiv = viewRef.current as HTMLDivElement;
            viewDiv.scrollIntoView();
        }
    }, []);

    return (
        <div style={ props.style || {} } ref={viewRef} className={`tw-grid ${styles.view} ${props.className || ''}`}>
            {
                items.map((_, index) => {
                    const rowIndex = Math.floor(index / props.width);
                    const cellIndex = index % props.width;
                    const item = mapGetter(gameMap, rowIndex, cellIndex);
                    return <Item
                        key={`${rowIndex}-${cellIndex}`}
                        val={ item?.val }
                        state={ item?.state }
                        row={rowIndex}
                        cell={cellIndex}
                        onClick={props.itemClick} />
                })
            }
        </div>
    );
}
