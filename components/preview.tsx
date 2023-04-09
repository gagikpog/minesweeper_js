import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { mapGetter } from '../game/funcs/getters';
import { ItemState } from '../game/types';
import { RootState } from '../store/main';

import styles from '../styles/Preview.module.css';

interface IViewProps {
}

export default function Preview(props: IViewProps): JSX.Element {

    const size = 3;
    const gameMap = useSelector((state: RootState) => state.game.gameMap);
    const width = useSelector((state: RootState) => state.game.width);
    const height = useSelector((state: RootState) => state.game.height);

    const items = useMemo(() => {
        return Array(height * width).fill(null);
    }, [width, height])

    return (
        <div className={`${styles.wrapper}`}  style={{'--item-size': size}}>
            <div className={`tw-flex tw-flex-wrap tw-absolute tw-z-20 ${styles.preview} `} >
                {
                    items.map((_, index) => {
                        const rowIndex = Math.floor(index / width);
                        const cellIndex = index % width;
                        const item = mapGetter(gameMap, rowIndex, cellIndex);
                        return <div
                            key={`${rowIndex}-${cellIndex}`}
                            className={`${ styles.item } ${ item && item.state !== ItemState.hidden ? styles.opened : '' }`} ></div>
                    })
                }
            </div>
        </div>
    );
}
